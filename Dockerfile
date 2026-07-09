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

ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next && chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

# Report healthy only once the Next server actually accepts connections, so
# Coolify's rolling deploy waits for it before switching Traefik traffic to this
# container and tearing down the old one. Without this the swap happens while
# server.js is still booting -> Traefik has no backend -> 502 on every request
# (including JS chunks) right after each deploy. Any status < 500 (incl. auth
# 401 / locale 307) proves the server is up.
HEALTHCHECK --interval=10s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "const http=require('http');const req=http.get({host:'127.0.0.1',port:process.env.PORT||3000,path:'/'},r=>process.exit(r.statusCode<500?0:1));req.on('error',()=>process.exit(1));req.setTimeout(4000,()=>{req.destroy();process.exit(1)});"

CMD ["node", "server.js"]
