/**
 * Application-level constants
 * API metadata, titles, descriptions, and configuration
 */

export const appConstants = {
  api: {
    title: 'Course-OS API',
    description: 'API documentation for the Course-OS backend services.',
    version: '1.0',
  },
  swagger: {
    path: 'api',
    options: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter JWT access token',
    },
    tags: [
      {
        name: 'auth',
        description: 'Authentication and authorization endpoints',
      },
    ],
  },
};
