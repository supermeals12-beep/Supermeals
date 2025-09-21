// src/weekly-menu/dto/create-meal.dto.ts
import { IsEnum, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MealType } from '@prisma/client';
import { CreateMenuItemDto } from './create-menu-item.dto';

export class CreateMealDto {
    @IsEnum(MealType)
    mealType: MealType;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMenuItemDto)
    items?: CreateMenuItemDto[];
}
