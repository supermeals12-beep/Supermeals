// src/mess/mess.module.ts
import { Module } from '@nestjs/common';
import { MessService } from './mess.service';
import { MessController } from './mess.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [MessController],
    providers: [MessService, PrismaService],
    exports: [MessService],
})
export class MessModule { }
