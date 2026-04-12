import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ✅ REGISTER
  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 409, description: 'Email already taken.' })
  register(@Body() dto: CreateAuthDto) {
    return this.authService.create(dto);
  }

  // ✅ LOGIN
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({ status: 200, description: 'User authenticated successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  // ✅ GET ALL USERS (ADMIN ONLY)
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all users (ADMIN only)' })
  @ApiResponse({ status: 200, description: 'Users fetched successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll() {
    return this.authService.findAll();
  }

  // ✅ GET ONE USER
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User fetched successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  // ✅ UPDATE USER
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', example: 'uuid-value' })
  @ApiBody({ type: UpdateAuthDto })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAuthDto,
  ) {
    return this.authService.update(id, dto);
  }

  // ✅ DELETE USER
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete user (ADMIN only)' })
  @ApiParam({ name: 'id', example: 'uuid-value' })
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}