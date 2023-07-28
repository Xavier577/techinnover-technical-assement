import RequestLoggerParser from '@common/utils/request-logger-parser';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ResponseLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseLoggerInterceptor.name);

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest() as Request;

    const requestInfo = RequestLoggerParser(request);

    return next.handle().pipe(
      tap({
        next: async (data) => {
          this.logger.log(
            JSON.stringify({
              requestInfo: JSON.parse(requestInfo),
              responseData: data,
            }),
          );

          return data;
        },
        error: async (err) => {
          this.logger.error(err);

          return err;
        },
      }),
    );
  }
}
