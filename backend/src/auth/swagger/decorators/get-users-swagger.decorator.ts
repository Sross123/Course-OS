import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function GetUsersSwagger() {
  return applyDecorators(
    ApiBearerAuth('JWT-auth'),
    ApiOperation({ summary: 'Get all users (ADMIN only)' }),
    ApiResponse({
      status: 200,
      description: 'Users fetched successfully.',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
    }),
  );
}
