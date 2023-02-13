import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WithPathLogger } from 'src/logger/with-path.logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: WithPathLogger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let message = exception['response']['message'];
    if (message instanceof Array) {
      message = message.join(', ');
    }
    const payload = `${JSON.stringify(request.body)} ${status} ${message}`;
    if (message.includes('not found') || message.includes('already exists')) {
      this.logger.warn(payload);
    } else if (message.includes('age must be a number')) {
      this.logger.error(payload);
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
