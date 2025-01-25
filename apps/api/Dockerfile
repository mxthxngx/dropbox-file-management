FROM node:18-alpine AS base

# Base setup for all stages
RUN apk update
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache curl
# Builder stage
FROM base AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune api --docker
RUN turbo prune client --docker


FROM base AS installer
WORKDIR /app

RUN npm install -g turbo

COPY --from=builder /app/out/json/ .
RUN npm install

COPY --from=builder /app/out/full/ .

RUN turbo build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

CMD node apps/api/dist/index.js