/**
 * Rate limiting and throttler constants
 * Centralized configuration for request throttling
 */

export const throttlerConstants = {
  ttl: 60, // time to live in seconds
  limit: 5, // max requests per ttl window
};
