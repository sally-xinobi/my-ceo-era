# ==============================
# BASE STAGE
# ==============================
FROM node:24-alpine AS base


# ==============================
# BUILDER STAGE
# ==============================
FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build
RUN npm prune --production


# ==============================
# RUNTIME STAGE
# ==============================
FROM base AS prod
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN date -u -Iseconds > /app/build_datetime.txt
ENV NODE_NO_WARNINGS=1
ENV NODE_ENV=production
EXPOSE 3000
CMD [ "node", "server.js" ]
