import { ConsoleLogger, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IncomingMessage } from 'http';

@Injectable({ scope: Scope.REQUEST })
export class WithPathLogger extends ConsoleLogger {
  constructor(@Inject(REQUEST) private readonly request: IncomingMessage) {
    super();
  }

  log(message: string, context?: string) {
    super.log(
      message,
      context || `${this.request.method} ${this.request.url.split('?')[0]}`,
    );
  }

  warn(message: string, context?: string) {
    super.warn(
      message,
      context || `${this.request.method} ${this.request.url.split('?')[0]}`,
    );
  }

  error(message: string, context?: string) {
    super.error(
      message,
      context || `${this.request.method} ${this.request.url.split('?')[0]}`,
    );
  }
}
