import { Request } from 'express';

export default function RequestLoggerParser(req: Request): string {
  return JSON.stringify({
    method: req.method,
    path: req.path,
    origin: req.headers.origin,
    headers: req.headers,
    body: req.body,
    query: req.query,
    param: req.param,
    clientInfo: {
      ip: req.socket.remoteAddress,
      ipVersion: req.socket.remoteFamily,
    },
    timestamp: new Date(),
  });
}
