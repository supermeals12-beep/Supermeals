// subscription/subscription.controller.ts
import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionDto } from './dto/subscription.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/decorators/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';



@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() dto: SubscriptionDto) {
    return this.subscriptionService.create(dto);
  }

  @Get()
  async findAll() {
    return this.subscriptionService.findAll();
  }

  @Get("/:id")
  async findOne(@Query('id', ParseIntPipe) id: string) {
    return this.subscriptionService.findOne(id);
  }
}
