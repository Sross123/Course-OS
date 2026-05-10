import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateAuthDto } from '../../dto/create-auth.dto';

export function RegisterSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new user account' }),
    ApiBody({ type: CreateAuthDto }),
    ApiResponse({
      status: 201,
      description: 'User registered successfully.',
    }),
    ApiResponse({
      status: 409,
      description: 'Email already taken.',
    }),
  );
}
