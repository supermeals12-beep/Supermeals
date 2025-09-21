import { IsInt, IsString, IsNumber, IsOptional } from 'class-validator';

export class SubscriptionDto {

  @IsString()
  subscriptionName: string;

  @IsString()
  description: string;

  @IsString()
  messId: string;

  @IsString()
  menuId: string;

  @IsNumber()
  pricePerDay: number;

}