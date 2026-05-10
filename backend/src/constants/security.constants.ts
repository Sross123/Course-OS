/**
 * Security-related constants (JWT & Bcrypt)
 * Centralized configuration for authentication and password hashing
 */

import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConstants: JwtModuleOptions = {
  secret: `${process.env.JWT_SECRET}`,
  signOptions: {
    expiresIn: '1h',
  },
};

export const bcryptConstants = {
  saltRounds: parseInt(process.env.SALT_ROUND || '10', 10),
};
