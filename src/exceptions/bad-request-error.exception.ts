import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestError extends HttpException {
  constructor(criteria: any) {
    super(criteria, HttpStatus.BAD_REQUEST);
  }
}
