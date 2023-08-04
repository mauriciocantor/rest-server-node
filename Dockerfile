FROM node:18 as development
WORKDIR /usr/src/app
COPY ./ ./
COPY package*.json ./
RUN npm install
CMD [ "npm", "run", "start:dev" ]

# Builder stage
FROM development as builder
WORKDIR /usr/src/app
RUN ls -l
RUN rm -rf node_modules
RUN npm ci --only=production
RUN npm run start

# Production stage
FROM alpine:latest as production
RUN apk --no-cache add nodejs ca-certificates
WORKDIR /root/
COPY --from=builder /usr/src/app ./
CMD [ "node", "./build/bin/www.js" ]