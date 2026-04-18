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
- **Swagger Documentation**: Organized with reusable decorators for clean, maintainable API docs
- **Global Exception Handling**: Centralized error responses with consistent format and logging

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
│   ├── config/                # Configuration files
│   │   └── swagger.config.ts  # Swagger/OpenAPI setup
│   ├── common/                # Shared utilities and filters
│   │   └── filters/
│   │       ├── index.ts
│   │       └── global-exception.filter.ts
│   ├── auth/                  # Authentication module
│   │   ├── auth.controller.ts # Main controller (clean & minimal)
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── constant.ts
│   │   ├── decorators/
│   │   │   └── roles.decorator.ts
│   │   ├── dto/
│   │   │   ├── create-auth.dto.ts
│   │   │   ├── login-auth.dto.ts
│   │   │   └── update-auth.dto.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── swagger/           # Swagger documentation
│   │       └── decorators/    # Reusable Swagger decorators
│   │           ├── index.ts
│   │           ├── register-swagger.decorator.ts
│   │           ├── login-swagger.decorator.ts
│   │           ├── get-users-swagger.decorator.ts
│   │           ├── get-user-swagger.decorator.ts
│   │           ├── update-user-swagger.decorator.ts
│   │           └── delete-user-swagger.decorator.ts
│   ├── user/                  # User management module
│   │   ├── user.module.ts
│   │   └── user.service.ts
│   ├── prisma/                # Prisma database integration
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── generated/             # Generated Prisma client
│   ├── types/                 # Shared type definitions
│   │   └── global.type.ts     # Enums and types (Roles)
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

## Architecture & Code Quality

### Centralized Swagger Configuration

All Swagger/OpenAPI configuration is centralized in `src/config/swagger.config.ts`. The `setupSwagger()` function is called from `main.ts` to keep the entry point clean:

```typescript
// main.ts
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);  // ✅ One line setup
  await app.listen(process.env.PORT ?? 3000);
}
```

### Global Exception Handling

All exceptions are caught and handled by `GlobalExceptionFilter` (in `src/common/filters/`) which provides consistent error responses:

**Error Response Format:**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Email already taken.",
  "timestamp": "2026-04-19T10:30:00.000Z",
  "path": "/auth/register"
}
```

**Features:**
- ✅ Catches both `HttpException` and unknown exceptions
- ✅ Consistent JSON response format
- ✅ Automatic logging of errors
- ✅ Includes request path and timestamp
- ✅ Applied globally in `main.ts`

### Swagger Documentation Pattern

We use a **decorator-based pattern** to keep controllers clean and Swagger docs maintainable:

```typescript
// ✅ Clean controller
@Post('register')
@RegisterSwagger()
register(@Body() dto: CreateAuthDto) {
  return this.authService.create(dto);
}
```

All Swagger decorators are defined in `src/auth/swagger/decorators/` using `applyDecorators()` for reusability:
- `@RegisterSwagger()` - Register endpoint documentation
- `@LoginSwagger()` - Login endpoint documentation
- `@GetUsersSwagger()` - Get all users documentation
- `@GetUserSwagger()` - Get single user documentation
- `@UpdateUserSwagger()` - Update user documentation
- `@DeleteUserSwagger()` - Delete user documentation

**Benefits:**
- Controllers remain readable and focused on business logic
- Swagger documentation is centralized and easy to maintain
- Decorators are reusable across modules
- No decorator clutter in controller methods

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
- ✅ Role-based access guard
- ✅ Swagger documentation with reusable decorators
- ✅ Auth controller refactored for production-ready code
- ✅ Global exception filter with centralized error handling

### In Progress / Planned
- 🔄 Course management endpoints
- 🔄 User profile management
- 🔄 Input sanitization
- 🔄 Rate limiting
- 🔄 Database seeding
- 🔄 User module Swagger decorators

## Contributing

1. Follow existing code style
2. Run tests before committing
3. Update documentation for new features
4. Use conventional commit messages

## License

UNLICENSED