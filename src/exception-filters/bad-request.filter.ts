import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BadRequestResponse } from 'src/decorators/swagger/bad-request-response.decorator';
import { BadRequestError } from 'src/exceptions/bad-request-error.exception';

@Catch(BadRequestError)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    BadRequestResponse({ description: exception.message });

    return response.status(HttpStatus.BAD_REQUEST).json({
      error: 'Bad request',
      message: exception.message,
    });
  }
}
