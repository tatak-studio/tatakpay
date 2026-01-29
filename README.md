# Tatak Pay Monorepo

This monorepo contains the entire codebase for the Tatak Pay ecosystem, built using Turborepo.

## Project Structure

The project is organized into the following workspaces:

### Applications (`apps/*`)

- **[Admin Portal](apps/admin/README.md)** (`apps/admin`):
  - A Next.js application for business owners to manage invoices, view transactions, and configure settings.
  - Port: `3001` (default)
- **[Customer Dashboard](apps/client/README.md)** (`apps/client`):
  - A Next.js application for customers to view their payment history and pay invoices.
  - Port: `3000` (default)
- **[Mobile App](apps/mobile/DEPLOYMENT.md)** (`apps/mobile`):
  - An Expo (React Native) mobile application for on-the-go access.
- **[API Service](apps/api/README.md)** (`apps/api`):
  - A NestJS backend service that powers all frontend applications. Handles business logic, database interactions (Prisma/PostgreSQL), and payment processing (Xendit).
  - Port: `4000` (default)

### Packages (`packages/*`)

- `@repo/ui`: Shared React UI components.
- `@repo/api-types`: Shared TypeScript interfaces and types.
- `@repo/eslint-config`: Shared ESLint configurations.
- `@repo/typescript-config`: Shared tsconfig configurations.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm (Package Manager)
- Docker (for local database)

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Running Locally

1.  **Environment Setup**: Ensure you have `.env` files configured in `apps/api`, `apps/client`, and `apps/admin`.
2.  **Start Database**:
    ```bash
    docker-compose up -d
    ```
3.  **Run Development Server**:
    To start all applications simultaneously:
    ```bash
    pnpm dev
    ```

### Building

To build all apps and packages:

```bash
pnpm build
```
