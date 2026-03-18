FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_STOMP_URL
ENV NEXT_PUBLIC_STOMP_URL=$NEXT_PUBLIC_STOMP_URL
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
ENV API=""
ENV GITHUB_CLIENT_ID=""
EXPOSE 3000
CMD ["node", "server.js"]