import { Module } from '@nestjs/common';
import { Prisma } from './providers/prisma';

@Module({
  providers: [Prisma],
  exports: [Prisma],
})
export class DatabaseModule {}
