import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import RequestLoggerParser from '@common/utils/request-logger-parser';
export default async function RequestLoggerMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const requestInfo = RequestLoggerParser(req);

  const logger = new Logger(RequestLoggerMiddleware.name);

  logger.log(requestInfo);

  next();
}
