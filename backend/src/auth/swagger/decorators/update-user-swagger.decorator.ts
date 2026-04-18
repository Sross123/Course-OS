import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateAuthDto } from '../../dto/update-auth.dto';

export function UpdateUserSwagger() {
  return applyDecorators(
    ApiBearerAuth('JWT-auth'),
    ApiOperation({ summary: 'Update user by ID' }),
    ApiParam({ name: 'id', description: 'User ID', example: 'uuid-value' }),
    ApiBody({ type: UpdateAuthDto }),
    ApiResponse({
      status: 200,
      description: 'User updated successfully.',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
    }),
  );
}
