// cart.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AddToCartDto } from "./dto/add-to-cart.dto";

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) { }

  async addToCart(userId: string, dto: AddToCartDto) {
    // Check if user already has a cart
    let cart = await this.prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }

    // Add item (either meal or menuItem)
    const cartItem = await this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        mealId: dto.mealId,
        menuItemId: dto.menuItemId,
        quantity: dto.quantity,
        price: parseFloat(dto.price),
      },
    });

    return cartItem;
  }

  async getCart(userId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            meal: true,
            menuItem: true,
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    return cart;
  }
}
