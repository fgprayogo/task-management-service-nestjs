FROM node:lts AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

ENTRYPOINT [ "/app/entrypoint.sh" ]
