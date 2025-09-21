// src/weekly-menu/weekly-menu.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeeklyMenuDto } from './dto/create-weekly-menu.dto';
import { UpdateWeeklyMenuDto } from './dto/update-weekly-menu.dto';

@Injectable()
export class WeeklyMenuService {
    constructor(private prisma: PrismaService) { }

    async create(createWeeklyMenuDto: CreateWeeklyMenuDto) {
        const { dayOfWeek, messId, meals } = createWeeklyMenuDto;

        return this.prisma.weeklyMenu.create({
            data: {
                dayOfWeek,
                messId,
                meals: meals
                    ? {
                        create: meals.map((meal) => ({
                            mealType: meal.mealType,
                            items: meal.items
                                ? {
                                    create: meal.items.map((item) => ({
                                        name: item.name,
                                        category: item.category,
                                        isVeg: item.isVeg,
                                        calories: item.calories,
                                        price: item.price,
                                    })),
                                }
                                : undefined,
                        })),
                    }
                    : undefined,
            },
            include: {
                meals: {
                    include: { items: true },
                },
            },
        });
    }

    async findAll() {
        return this.prisma.weeklyMenu.findMany({
            include: {
                meals: {
                    include: { items: true },
                },
            },
        });
    }

    async findOne(id: string) {
        const menu = await this.prisma.weeklyMenu.findUnique({
            where: { id },
            include: {
                meals: { include: { items: true } },
            },
        });
        if (!menu) throw new NotFoundException(`Weekly menu with ID ${id} not found`);
        return menu;
    }

    async update(id: string, updateWeeklyMenuDto: UpdateWeeklyMenuDto) {
        // you can extend this to handle nested updates
        return this.prisma.weeklyMenu.update({
            where: { id },
            data: {
                dayOfWeek: updateWeeklyMenuDto.dayOfWeek,
            },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.weeklyMenu.delete({
            where: { id },
        });
    }
}
