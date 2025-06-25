# Etapa 1: Builder
FROM node:24-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run build && pnpm prune --production

# Etapa 2: Runtime
FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["pnpm", "start"]
