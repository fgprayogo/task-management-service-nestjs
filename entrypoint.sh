#!/bin/bash

npx prisma migrate deploy

npx prisma generate

npx prisma db seed

node /app/dist/main.js