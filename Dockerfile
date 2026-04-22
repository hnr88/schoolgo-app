ARG NODE_VERSION=22-alpine

# =============================================================================
# Stage 1: Install dependencies (cached unless lockfile changes)
# =============================================================================
FROM node:${NODE_VERSION} AS deps

WORKDIR /app

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml .npmrc* ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# =============================================================================
# Stage 2: Build the Next.js application
# =============================================================================
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

RUN corepack enable pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

COPY . .

ENV NODE_ENV=production

RUN pnpm run build

# =============================================================================
# Stage 3: Production image (minimal, standalone)
# =============================================================================
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next && chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]
