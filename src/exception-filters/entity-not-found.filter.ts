import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { EntityNotFoundError } from 'src/exceptions/entity-not-found-error.exception';
import { NotFoundError } from 'src/exceptions/not-found-error.exception';

@Catch(EntityNotFoundError, NotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError | NotFoundError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    ApiNotFoundResponse({ description: exception.message });

    return response.status(HttpStatus.NOT_FOUND).json({
      error: 'Not Found',
      message: exception.message,
    });
  }
}
