import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ApiConflictResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { EntityConflictError } from 'src/exceptions/entity-conflict-error.exception';

@Catch(EntityConflictError)
export class EntityConflictExceptionFilter implements ExceptionFilter {
  catch(exception: EntityConflictError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    ApiConflictResponse({ description: exception.message });

    return response.status(HttpStatus.CONFLICT).json({
      error: 'Conflict',
      message: exception.message,
    });
  }
}
