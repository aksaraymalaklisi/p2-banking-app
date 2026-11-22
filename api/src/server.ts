import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT ?? 3001);
const jwtSecret = (() => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET precisa estar configurado.");
  }
  return secret;
})();

app.use(cors());
app.use(express.json());

const credentialsSchema = z.object({
  email: z.string().trim().email("Informe um e-mail válido."),
  password: z.string().min(1, "Informe sua senha.").max(72),
});

const registrationSchema = credentialsSchema.extend({
  name: z.string().trim().min(2, "Informe seu nome.").max(80),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres.").max(72),
});

const transactionSchema = z.object({
  type: z.enum(["PIX", "PAYMENT"]),
  description: z.string().trim().min(2).max(120),
  amount: z.number().finite().min(0.01).max(100000),
});

function publicUser(user: {
  id: string;
  name: string;
  email: string;
  balanceCents: number;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    balanceCents: user.balanceCents,
  };
}

function createAuthResponse(user: {
  id: string;
  name: string;
  email: string;
  balanceCents: number;
}) {
  return {
    token: jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "12h" }),
    user: publicUser(user),
  };
}

function authenticate(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const authorization = request.header("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    response.status(401).json({ error: "Faça login para continuar." });
    return;
  }

  try {
    const payload = jwt.verify(authorization.slice(7), jwtSecret);
    if (typeof payload === "string" || typeof payload.userId !== "string") {
      response.status(401).json({ error: "Sessão inválida. Entre novamente." });
      return;
    }
    request.userId = payload.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      response.status(401).json({ error: "Sessão inválida. Entre novamente." });
      return;
    }
    next(error);
  }
}

app.get("/health", async (_request, response) => {
  await prisma.$queryRaw`SELECT 1`;
  response.json({ status: "ok" });
});

app.post("/auth/register", async (request, response) => {
  const parsed = registrationSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: parsed.error.issues[0]?.message ?? "Dados inválidos." });
    return;
  }

  const { name, email, password } = parsed.data;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash: await bcrypt.hash(password, 12),
      },
    });
    response.status(201).json(createAuthResponse(user));
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      response.status(409).json({ error: "Este e-mail já possui uma conta." });
      return;
    }
    throw error;
  }
});

app.post("/auth/login", async (request, response) => {
  const parsed = credentialsSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: parsed.error.issues[0]?.message ?? "Dados inválidos." });
    return;
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    response.status(401).json({ error: "E-mail ou senha incorretos." });
    return;
  }
  response.json(createAuthResponse(user));
});

app.get("/account", authenticate, async (request, response) => {
  if (!request.userId) {
    response.status(401).json({ error: "Faça login para continuar." });
    return;
  }
  const user = await prisma.user.findUnique({
    where: { id: request.userId },
    select: { id: true, name: true, email: true, balanceCents: true },
  });
  if (!user) {
    response.status(404).json({ error: "Conta não encontrada." });
    return;
  }
  response.json(publicUser(user));
});

app.get("/transactions", authenticate, async (request, response) => {
  if (!request.userId) {
    response.status(401).json({ error: "Faça login para continuar." });
    return;
  }
  const transactions = await prisma.transaction.findMany({
    where: { userId: request.userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  response.json(transactions);
});

app.post("/transactions", authenticate, async (request, response) => {
  if (!request.userId) {
    response.status(401).json({ error: "Faça login para continuar." });
    return;
  }
  const userId = request.userId;
  const parsed = transactionSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: parsed.error.issues[0]?.message ?? "Dados inválidos." });
    return;
  }

  const amountCents = Math.round(parsed.data.amount * 100);
  const result = await prisma.$transaction(async (database) => {
    const updated = await database.user.updateMany({
      where: { id: userId, balanceCents: { gte: amountCents } },
      data: { balanceCents: { decrement: amountCents } },
    });
    if (updated.count === 0) {
      return null;
    }

    const transaction = await database.transaction.create({
      data: {
        userId,
        type: parsed.data.type,
        description: parsed.data.description,
        amountCents,
      },
    });
    const account = await database.user.findUniqueOrThrow({
      where: { id: userId },
      select: { balanceCents: true },
    });
    return { transaction, balanceCents: account.balanceCents };
  });

  if (!result) {
    response.status(422).json({ error: "Saldo insuficiente para concluir esta operação." });
    return;
  }
  response.status(201).json(result);
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: "Ocorreu um erro interno. Tente novamente." });
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`API disponível na porta ${port}.`);
});

async function shutdown() {
  server.close();
  await prisma.$disconnect();
}

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());
