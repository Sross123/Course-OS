import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}

/**
 * Global Exception Filter
 * Catches all exceptions and returns a formatted JSON response
 * Handles both HttpException and unknown exceptions
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;

    // Handle HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Extract message from different response formats
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const objResponse = exceptionResponse as any;
        message = objResponse.message || exception.message || 'An error occurred';
      } else {
        message = exception.message || 'An error occurred';
      }
    } else {
      // Handle unknown exceptions
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      
      // Log the actual error for debugging
      if (exception instanceof Error) {
        this.logger.error(`Unhandled Exception: ${exception.message}`, exception.stack);
      } else {
        this.logger.error('Unhandled Exception:', exception);
      }
    }

    const errorResponse: ErrorResponse = {
      success: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Log the error
    this.logger.warn(
      `${request.method} ${request.url} - ${status} - ${message}`
    );

    response.status(status).json(errorResponse);
  }
}
