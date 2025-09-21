import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // adjust path
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async createUser(createUserDto: CreateUserDto) {
        const { name, email, phone, password } = createUserDto;
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                phone,
                role: Roles.END_USER,
                is_verified: false,
                CustomerProfile: { create: {} }
            },
        });

        return user
    }

    async createAdmin(createUserDto: CreateUserDto) {
        const { name, email, phone, password } = createUserDto;
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                phone,
                role: Roles.ADMIN,
                is_verified: true,
                CustomerProfile: { create: {} }
            },
        });
        return user
    }

    //admin use only
    async findAllEndUsers() {
        return this.prisma.user.findMany({
            where: {
                role: 'END_USER',
            },
            include: {
                CustomerProfile: true,
            },
        });
    }

    //admin use only
    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                CustomerProfile: true,
            },
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    //admin use only
    async remove(id: string) {
        return this.prisma.user.delete({
            where: { id },
        });
    }

    //admin use function to update End-User data
}
