// cart.controller.ts
import { Controller, Post, Body, Get, Req, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { AddToCartDto } from "./dto/add-to-cart.dto";
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) { }

  @UseGuards(JwtAuthGuard)
  @Post("add")
  async addToCart(@Req() req, @Body() dto: AddToCartDto) {
    const userId = req.user.id; // assuming JWT AuthGuard attaches user
    return this.cartService.addToCart(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCart(@Req() req) {
    const userId = req.user.id;
    return this.cartService.getCart(userId);
  }
}
