// src/mess/dto/create-mess.dto.ts
import { IsString, IsOptional, IsEnum, IsInt, IsNumber, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { MessType } from '@prisma/client'; // assuming Prisma generated this enum

export class CreateMessDto {
    @IsString()
    name: string;

    @IsEnum(MessType)
    type: MessType;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsInt()
    capacity?: number;

    @IsOptional()
    @IsString()
    contact?: string;

    //this is called nested validations
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMessDtoImageDto)
    images?: CreateMessDtoImageDto[];
}

export class CreateMessDtoImageDto {

    @IsString()
    url: string;

    @IsOptional()
    @IsString()
    altText?: string;

    @IsOptional()
    @IsBoolean()
    isMain?: boolean;

    @IsOptional()
    @IsNumber()
    sortOrder?: number;
}
