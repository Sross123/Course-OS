import { applyDecorators, HttpCode } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginAuthDto } from '../../dto/login-auth.dto';

export function LoginSwagger() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Login with email and password' }),
    ApiBody({ type: LoginAuthDto }),
    ApiResponse({
      status: 200,
      description: 'User authenticated successfully.',
    }),
    ApiResponse({
      status: 401,
      description: 'Invalid email or password.',
    }),
  );
}
