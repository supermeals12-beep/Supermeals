// src/weekly-menu/dto/create-weekly-menu.dto.ts
import { IsEnum, IsUUID, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { DayOfWeek } from '@prisma/client'; // Prisma enum
import { Type } from 'class-transformer';
import { CreateMealDto } from './create-meal.dto';

export class CreateWeeklyMenuDto {
    @IsEnum(DayOfWeek)
    dayOfWeek: DayOfWeek;

    @IsUUID()
    messId: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMealDto)
    meals?: CreateMealDto[];
}
