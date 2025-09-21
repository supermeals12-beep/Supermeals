// src/weekly-menu/dto/create-menu-item.dto.ts
import { IsString, IsEnum, IsOptional, IsBoolean, IsInt, IsUUID, IsNumber } from 'class-validator';
import { FoodType } from '@prisma/client'; // Prisma enum

export class CreateMenuItemDto {
    @IsString()
    name: string;

    @IsEnum(FoodType)
    category: FoodType;

    @IsOptional()
    @IsBoolean()
    isVeg?: boolean;

    @IsOptional()
    @IsInt()
    calories?: number;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsUUID()
    mealId?: string; // optional when nested create
}
