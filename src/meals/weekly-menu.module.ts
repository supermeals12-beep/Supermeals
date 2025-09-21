// src/weekly-menu/weekly-menu.module.ts
import { Module } from '@nestjs/common';
import { WeeklyMenuService } from './weekly-menu.service';
import { WeeklyMenuController } from './weekly-menu.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [WeeklyMenuController],
    providers: [WeeklyMenuService, PrismaService],
})
export class WeeklyMenuModule { }
