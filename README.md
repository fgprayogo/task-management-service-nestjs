# Task Management Service

# Objective

Create a web API for a simple task management system with the following functions:
● /account/register to register a new staff
● /account/login to authenticate a staff
● /task/create to create a new task
● /task/assign to assign tasks to a staff
● /task/delete to delete a task
● /task/complete to mark a task as completed

Requirements :
● Use Docker-Compose so that the system can be deployed locally
● Use NodeJS (minimum version 16) and MySQL
● Provide a database
● Provide a Postman collection for testing the API functions
● Use appropriate HTTP codes as responses for various scenario of the API
requests, e.g: HTTP 200 OK, 401 Unauthorized, etc
● The business logic and system properties (account and task properties
etc) assumptions to be determined by candidate
● An admin account to be created initially
● Ensure that the Docker containers can be deployed cross-platform (at
least Windows and Linux)
● ZIP the codes.

# Prerequisites

## Tools

1. NodeJS
2. Docker
3. Mysql
4. Postman

# Project Setup

### Without Docker

1. Clone this repo.
2. Go to the root project directories
3. Install the packages
   `npm i`
4. Duplicate .env.example file and rename it to .env and fill with your credentials
5. Run prisma orm migration
   `npx prisma migrate deploy`
6. Run prisma seed
   `npx prisma db seed`
7. Start the project
   `npm run start:dev`
8. The project will run at
   `http://localhost:3000`

### Using Docker Compose

1. Clone this repo.
2. Go to the root project directories
3. Install the packages
   `npm i`
4. Duplicate .env.example file and rename it to .env and fill with your credentials. Make sure you read description in .env carefully
5. Run docker compose build
   `docker-compose build`
6. Run docker compose up
   `docker-compose up`
7. The project will run at
   `http://localhost:3000`

# REST API Documentation

1. Go do `docs/api` directory and download the postman file
2. Import the postman file doc to your postman

## Author

- [@fgprayogo](https://www.github.com/fgprayogo)
