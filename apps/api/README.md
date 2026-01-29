# Tatak Pay - API Service

The API Service is the backend backbone of the Tatak Pay ecosystem, built with NestJS.

## Features

- **RESTful API**: Provides endpoints for the Admin Portal, Customer Dashboard, and Mobile App.
- **Database Access**: Manages data persistence using Prisma ORM with PostgreSQL.
- **Payment Processing**: Integrates with Xendit for handling payments.
- **Authentication**: Manages user sessions and authorization.

## Getting Started

### Prerequisites

Ensure you have a PostgreSQL database running (e.g., via Docker) and your `.env` file configured.

### Running Locally

```bash
# Development mode
pnpm start:dev

# Production mode
pnpm start:prod
```

The API typically runs on [http://localhost:4000](http://localhost:4000).

## Database Migrations

To apply database changes:

```bash
npx prisma migrate dev
```

## Tech Stack

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Language**: TypeScript
