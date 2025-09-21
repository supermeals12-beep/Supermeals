// src/order/order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }

    async create(createOrderDto: CreateOrderDto) {
        return this.prisma.order.create({
            data: createOrderDto,
            include: {
                shippingAddress: true,
                customerProfile: true,
                subscription: true,
            },
        });
    }

    async findAll() {
        return this.prisma.order.findMany({
            include: {
                shippingAddress: true,
                customerProfile: true,
                subscription: true,
            },
        });
    }

    async findOne(id: string) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                shippingAddress: true,
                customerProfile: true,
                subscription: true,
            },
        });
        if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
        return order;
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        await this.findOne(id); // ensure exists
        return this.prisma.order.update({
            where: { id },
            data: updateOrderDto,
            include: {
                shippingAddress: true,
                customerProfile: true,
                subscription: true,
            },
        });
    }

    async remove(id: string) {
        await this.findOne(id); // ensure exists
        return this.prisma.order.delete({ where: { id } });
    }
}
