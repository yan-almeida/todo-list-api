import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundError extends HttpException {
  constructor(entityClassName: any, criteria?: any) {
    super(
      criteria
        ? `No data found on ${entityClassName.name} entity. Criteria: ${criteria}.`
        : `No data found on ${entityClassName.name} entity.`,

      HttpStatus.NOT_FOUND,
    );
  }
}
