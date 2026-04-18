import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

export function DeleteUserSwagger() {
  return applyDecorators(
    ApiBearerAuth('JWT-auth'),
    ApiOperation({ summary: 'Delete user (ADMIN only)' }),
    ApiParam({ name: 'id', description: 'User ID', example: 'uuid-value' }),
    ApiResponse({
      status: 200,
      description: 'User deleted successfully.',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
    }),
  );
}
