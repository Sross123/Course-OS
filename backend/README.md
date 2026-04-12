# Course-OS Backend

A NestJS backend API for the Course-OS platform, providing user registration, authentication, and basic user management.

## Overview

This backend implements the API layer for Course-OS, a course management system. It supports user registration, login, JWT authentication, and user listing.

## Features

- **User Authentication & Registration**: Secure signup with email validation and password hashing
- **JWT Authentication**: Access tokens for protected routes
- **Role-aware User Model**: Support for STUDENT, INSTRUCTOR, and ADMIN roles
- **Database Integration**: PostgreSQL with Prisma ORM
- **Input Validation**: DTO validation using class-validator
- **TypeScript**: Full TypeScript support for type safety

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: bcrypt and JWT
- **Validation**: class-validator & class-transformer
- **Language**: TypeScript

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migration files
├── src/
│   ├── auth/                  # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts
│   │   ├── dto/
│   │   │   ├── create-auth.dto.ts
│   │   │   ├── login-auth.dto.ts
│   │   │   └── update-auth.dto.ts
│   ├── user/                  # User management module
│   │   ├── user.module.ts
│   │   └── user.service.ts
│   ├── prisma/                # Prisma database integration
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── generated/             # Generated Prisma client
│   ├── types/                 # Shared type definitions
│   │   ├── global.type.d.ts
│   │   └── global.type.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/                      # End-to-end tests
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## Database Schema

### User Model
- `id`: UUID primary key
- `name`: User's full name
- `email`: Unique email address
- `password`: Hashed password
- `role`: User role (STUDENT, INSTRUCTOR, ADMIN)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
  - Body: `{ name, email, password, role }`
  - Returns: Registered user data (password excluded)

- `POST /auth/login` - Authenticate an existing user
  - Body: `{ email, password }`
  - Returns: JWT access token and refresh token

- `GET /auth` - Fetch all users (protected)
  - Requires a valid JWT in `Authorization: Bearer <token>` header

## Installation

1. **Install dependencies:**
   ```bash
   cd backend
   pnpm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/course_os"
   PORT=3000
   ```

3. **Database Setup:**
   ```bash
   pnpm prisma generate
   pnpm prisma migrate dev
   ```

## Running the Application

### Development
```bash
pnpm start:dev
```

### Swagger API Documentation
After starting the server, open:

```bash
http://localhost:3000/api
```

Use the **Authorize** button in Swagger UI with:

```text
Bearer <your-access-token>
```

### Production
```bash
pnpm build
pnpm start:prod
```

### Testing
```bash
pnpm test
pnpm test:e2e
pnpm test:cov
```

## Scripts

- `build`: Build the application
- `format`: Format code with Prettier
- `start`: Start production server
- `start:dev`: Start development server with hot reload
- `dev`: Alias for `start:dev`
- `start:debug`: Start application in debug mode
- `lint`: Run ESLint
- `test`: Run unit tests
- `test:watch`: Run tests in watch mode
- `test:e2e`: Run end-to-end tests

## Development Progress

### Completed Features
- ✅ NestJS backend setup
- ✅ Prisma integration with PostgreSQL
- ✅ User model with roles
- ✅ User registration and login endpoints
- ✅ Password hashing with bcrypt
- ✅ Email uniqueness validation
- ✅ DTO validation with class-validator
- ✅ JWT authentication guard
- ✅ Database migrations

### In Progress / Planned
- 🔄 Role-based access guard
- 🔄 Course management endpoints
- 🔄 User profile management
- 🔄 Enhanced error handling
- 🔄 Input sanitization
- 🔄 Rate limiting
- 🔄 Database seeding

## Contributing

1. Follow existing code style
2. Run tests before committing
3. Update documentation for new features
4. Use conventional commit messages

## License

UNLICENSED