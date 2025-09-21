import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @IsOptional()
  menuItemId: string;

  @IsString()
  @IsOptional()
  mealId: string;
}

export class UpdateWishlistDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}
