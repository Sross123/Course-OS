/**
 * Validation pipe configuration constants
 * Centralized settings for input validation and transformation
 */

export const validationConstants = {
  whitelist: true, // remove unknown properties
  forbidNonWhitelisted: true, // throw error on unknown properties
  transform: true, // auto-transform payloads to DTOs
};
