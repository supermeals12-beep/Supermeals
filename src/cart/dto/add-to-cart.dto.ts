// dto/add-to-cart.dto.ts
import { IsInt, IsOptional, IsString } from "class-validator";

export class AddToCartDto {
  @IsOptional()
  @IsString()
  mealId?: string;

  @IsOptional()
  @IsString()
  menuItemId?: string;

  @IsInt()
  quantity: number;

  @IsString()
  price: string; // snapshot price
}
