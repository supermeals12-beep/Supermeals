import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionDto } from './dto/subscription.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) { }

  //Admin Only
  async create(dto: SubscriptionDto) {
    const created = await this.prisma.subscription.create({
      data: {
        description: dto.description,
        subscriptionName: dto.subscriptionName,
        messId: dto.messId,
        menuId: dto.menuId,
        pricePerDay: dto.pricePerDay,
      },
    });
    return {
      message: 'Subscription plan created successfully',
      data: created,
      status: HttpStatus.CREATED,
    };
  }

  //Public
  async findAll() {
    const subscriptions = await this.prisma.subscription.findMany();
    return {
      message: 'All subscription plans fetched successfully',
      data: subscriptions,
      status: HttpStatus.OK,
    };
  }

  //Public
  async findOne(id: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id: id },
    });
    if (!subscription) {
      throw new NotFoundException('Subscription plan not found');
    }
    return {
      message: 'Subscription plan fetched successfully',
      data: subscription,
      status: HttpStatus.OK,
    };
  }
}
