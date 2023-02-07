import { Module } from '@nestjs/common';
import { WithPathLogger } from './with-path.logger';

@Module({
    providers: [WithPathLogger],
    exports: [WithPathLogger],
})
export class LoggerModule { }
