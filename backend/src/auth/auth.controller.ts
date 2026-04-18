import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

import { ApiTags } from '@nestjs/swagger';
import {
  RegisterSwagger,
  LoginSwagger,
  GetUsersSwagger,
  GetUserSwagger,
  UpdateUserSwagger,
  DeleteUserSwagger,
} from './swagger/decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @RegisterSwagger()
  register(@Body() dto: CreateAuthDto) {
    return this.authService.create(dto);
  }

  @Post('login')
  @LoginSwagger()
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @GetUsersSwagger()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @GetUserSwagger()
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UpdateUserSwagger()
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAuthDto,
  ) {
    return this.authService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @DeleteUserSwagger()
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}