# Course-OS Backend

A NestJS-based backend API for the Course-OS platform, providing user authentication and management functionality.

## Overview

This backend serves as the API layer for Course-OS, a course management system. It handles user registration, authentication, and user management with role-based access control.

## Features

- **User Authentication & Registration**: Secure user registration with email validation and password hashing
- **Role-Based Access Control**: Support for STUDENT, INSTRUCTOR, and ADMIN roles
- **Database Integration**: PostgreSQL database with Prisma ORM
- **Input Validation**: Global validation pipes using class-validator
- **Structured Logging**: JSON-formatted console logging
- **TypeScript**: Full TypeScript support for type safety

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: bcrypt for password hashing
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
│   │   ├── auth.controller.ts # Auth endpoints
│   │   ├── auth.service.ts    # Auth business logic
│   │   ├── auth.module.ts     # Auth module configuration
│   │   ├── dto/               # Data transfer objects
│   │   └── entities/          # Auth entities
│   ├── user/                  # User management module
│   │   ├── user.service.ts    # User service
│   │   └── user.module.ts     # User module
│   ├── prisma/                # Prisma database service
│   ├── generated/             # Auto-generated Prisma client
│   ├── app.module.ts          # Main application module
│   ├── app.controller.ts      # Root controller
│   ├── app.service.ts         # Root service
│   └── main.ts                # Application bootstrap
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
  - Returns: User data (excluding password)

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
   # Generate Prisma client
   pnpm prisma generate

   # Run database migrations
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

Use the **Authorize** button in Swagger UI and provide your JWT access token as:

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
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## Scripts

- `build`: Build the application
- `format`: Format code with Prettier
- `start`: Start production server
- `start:dev`: Start development server with hot reload
- `start:debug`: Start with debug mode
- `lint`: Run ESLint
- `test`: Run unit tests
- `test:watch`: Run tests in watch mode
- `test:e2e`: Run end-to-end tests

## Development Progress

### Completed Features
- ✅ Project setup with NestJS
- ✅ Prisma integration with PostgreSQL
- ✅ User model with roles
- ✅ User registration endpoint
- ✅ Password hashing with bcrypt
- ✅ Email uniqueness validation
- ✅ Global validation pipes
- ✅ Structured logging
- ✅ Database migrations
- ✅ Basic project structure

### In Progress / Planned
- 🔄 User login/authentication
- 🔄 JWT token implementation
- 🔄 Role-based middleware
- 🔄 Course management endpoints
- 🔄 User profile management
- 🔄 API documentation (Swagger)
- 🔄 Error handling middleware
- 🔄 Input sanitization
- 🔄 Rate limiting
- 🔄 Database seeding

## Contributing

1. Follow the existing code style
2. Run tests before committing
3. Update documentation for new features
4. Use conventional commit messages

## License

UNLICENSED