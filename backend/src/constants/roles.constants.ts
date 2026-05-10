/**
 * Centralized role constants and types
 * Single source of truth for all role-related definitions
 */

export enum Roles {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
}

export type TRoles = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

// Backwards compatibility constant object
export const IRoles = {
  ADMIN: 'ADMIN',
  INSTRUCTOR: 'INSTRUCTOR',
  STUDENT: 'STUDENT',
} as const;
