import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { PaginationResponseDto } from 'src/pagination/pagination-response.dto';


@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) { }

  async addToWishlist(dto: CreateWishlistDto, userId: string) {
    const { mealId, menuItemId } = dto;
    const customerProfile = await this.prisma.customerProfile.findUnique({
      where: { userId }, // userId maps to the CustomerProfile
    });
    if (!customerProfile) {
      throw new NotFoundException('Customer profile not found');
    }
    if (menuItemId) {
      const menuItem = await this.prisma.menuItem.findFirst({
        where: { id: menuItemId },
      });

      try {
        return await this.prisma.wishlist.create({
          data: {
            customerProfileId: customerProfile.id, // ✅ Correct FK
            menuItemId: menuItemId,
          },
        });
      } catch (err) {
        if (err.code === 'P2002') {
          throw new ConflictException('Menu item already exists in wishlist');
        }
        throw err;
      }
    }
    else if (mealId) {
      const meal = await this.prisma.meal.findFirst({
        where: { id: mealId },
      });
      try {
        return await this.prisma.wishlist.create({
          data: {
            customerProfileId: customerProfile.id, // ✅ Correct FK
            mealId: mealId,
          },
        });
      } catch (err) {
        if (err.code === 'P2002') {
          throw new ConflictException('Meal already exists in wishlist');
        }
        throw err;
      }
    }
  }

  async getWishlist(userId: string, pagination: PaginationDto) {
    const customerProfile = await this.prisma.customerProfile.findUnique({
      where: { userId },
    });
    if (!customerProfile) {
      throw new NotFoundException('Customer profile not found');
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.wishlist.findMany({
        where: { customerProfileId: customerProfile.id }, // ✅ correct FK
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.wishlist.count({
        where: { customerProfileId: customerProfile.id }, // ✅ correct FK
      }),
    ]);
    return new PaginationResponseDto(
      data,
      total,
      pagination.page ?? 1,
      pagination.limit ?? 10,
    );
  }

  async removeFromWishlist(id: string, userId: string) {
    const customerProfile = await this.prisma.customerProfile.findUnique({
      where: { userId },
    });
    if (!customerProfile) {
      throw new NotFoundException('Customer profile not found');
    }
    const item = await this.prisma.wishlist.findFirst({
      where: { id, customerProfileId: customerProfile.id }, // ✅ correct query
    });
    if (!item) throw new NotFoundException('Wishlist item not found');

    return this.prisma.wishlist.delete({
      where: { id }, // ✅ id is unique, safe to delete directly
    });
  }

  async clearWishlist(userId: string) {
    const customerProfile = await this.prisma.customerProfile.findUnique({
      where: { userId },
    });
    if (!customerProfile) {
      throw new NotFoundException('Customer profile not found');
    }

    return this.prisma.wishlist.deleteMany({
      where: { customerProfileId: customerProfile.id }, // ✅ correct FK
    });
  }
}
