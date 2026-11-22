FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./
RUN DATABASE_URL="postgresql://banking_app:local-build-only@localhost:5432/banking_app" npx prisma generate

COPY tsconfig.json ./
COPY src ./src

EXPOSE 3001
CMD ["sh", "-c", "npx prisma db push && npm run start"]
