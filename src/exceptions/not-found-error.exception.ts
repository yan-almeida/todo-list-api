import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends HttpException {
  constructor(customMessage: string) {
    super(customMessage, HttpStatus.NOT_FOUND);
  }
}
