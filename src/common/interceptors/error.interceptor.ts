import {
  CallHandler,
  ExecutionContext,
  HttpException,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(error);

        if (error instanceof HttpException) {
          throw error;
        }
        const errMsg = error?.message;
        const statusCode = error.statusCode || 500;

        if (statusCode >= 500) {
          throw new InternalServerErrorException();
        }

        throw new HttpException(errMsg, 400);
      }),
    );
  }
}
