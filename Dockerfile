FROM node:14-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY --chown=node:node . .
RUN npm ci


RUN npm run build \
    && npm prune --production

# ---

FROM node:14-alpine

ARG DATABASE_URL
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB
ARG PORT
ARG JWT_ACCESS_TOKEN_SECRET
ARG JWT_ACCESS_TOKEN_DURATION
ARG PMC_COMPILER_URL

ENV \
DATABASE_URL=${DATABASE_URL} \
POSTGRES_HOST=${POSTGRES_HOST} \
POSTGRES_PORT=${POSTGRES_PORT} \
POSTGRES_USER=${POSTGRES_USER} \
POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
POSTGRES_DB=${POSTGRES_DB} \
PORT=${PORT} \
JWT_ACCESS_TOKEN_SECRET=${JWT_ACCESS_TOKEN_SECRET} \
JWT_ACCESS_TOKEN_DURATION=${JWT_ACCESS_TOKEN_DURATION} \
PMC_COMPILER_URL=${PMC_COMPILER_URL}


#ENV \
#DATABASE_URL=postgres://xugoidplbvyyjj:9b002d41efdc9364cff2d9c11a82a230ce2b90c10d2f26303109ef64ae554886@ec2-63-35-156-160.eu-west-1.compute.amazonaws.com:5432/dalg6pdori24rh \
#POSTGRES_HOST=ec2-63-35-156-160.eu-west-1.compute.amazonaws.com \
#POSTGRES_PORT=5432 \
#POSTGRES_USER=xugoidplbvyyjj \
#POSTGRES_PASSWORD=9b002d41efdc9364cff2d9c11a82a230ce2b90c10d2f26303109ef64ae554886 \
#POSTGRES_DB=dalg6pdori24rh \
#PORT=3000 \
#JWT_ACCESS_TOKEN_SECRET=hfmuqzhrguohziàohthU3H4UBIofknefn \
#JWT_ACCESS_TOKEN_DURATION="2 days" \
#PMC_COMPILER_URL=https://backend-compiler.dev.pimp-my-code.xyz/program

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

EXPOSE 3000

CMD ["node", "dist/main.js"]
