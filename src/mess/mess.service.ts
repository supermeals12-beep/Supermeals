// src/mess/mess.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessDto } from './dto/mess.dto';
import { UpdateMessDto } from './dto/update-mess.dto';

@Injectable()
export class MessService {
    constructor(private prisma: PrismaService) { }

    async create(createMessDto: CreateMessDto) {
        const { images, ...messData } = createMessDto
        return this.prisma.mess.create({
            data: {
                ...messData,
                MessImage: images ? { create: images } : undefined,
            },
            include: {
                MessImage: true,
                menus: true,
                Subscription: true,
                Review: true,
            }
        });
    }

    async findAll() {
        return this.prisma.mess.findMany({
            include: {
                MessImage: true,
                menus: true,
                Subscription: true,
                Review: true,
            },
        });
    }

    async findOne(id: string) {
        const mess = await this.prisma.mess.findUnique({
            where: { id },
            include: {
                MessImage: true,
                menus: true,
                Subscription: true,
                Review: true,
            },
        });
        if (!mess) throw new NotFoundException(`Mess with ID ${id} not found`);
        return mess;
    }

    async update(id: string, updateMessDto: UpdateMessDto) {
        await this.findOne(id); // will throw if not found
        return this.prisma.mess.update({
            where: { id },
            data: updateMessDto,
        });
    }

    async remove(id: string) {
        await this.findOne(id); // will throw if not found
        return this.prisma.mess.delete({
            where: { id },
        });
    }
}
