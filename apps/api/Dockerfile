FROM node:18-alpine AS base

# Base setup for all stages
RUN apk update
RUN apk add --no-cache libc6-compat

# Builder stage
FROM base AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune api --docker
RUN turbo prune client --docker



# Installer stage
FROM base AS installer
WORKDIR /app

# Install Turbo globally
RUN npm install -g turbo

# Copy pruned dependencies
COPY --from=builder /app/out/json/ .
RUN npm install

# Copy full workspace to build
COPY --from=builder /app/out/full/ .

# Run the Turbo build command
RUN turbo build

# Runner stage
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

CMD node apps/api/dist/index.js