import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  #logger = new Logger('HTTP');
  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;

    const startingRequest = Date.now();
    response.on('finish', () => {
      this.#logger.verbose(`${method}: ${originalUrl}`);
      this.#logger.verbose(
        `Tempo de resposta: ${Date.now() - startingRequest}ms`,
      );
    });

    next();
  }
}
