// otp.service.ts
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OtpService {
    constructor(private prisma: PrismaService) { }

    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async createOtpForUser(userId: string) {
        const otp = this.generateOtp();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
        return this.prisma.userOtp.create({
            data: {
                otp: otp,
                expiresAt,
                user: { connect: { id: userId } },
            },
        });
    }

    async verifyOtp(userId: string, otp: string) {
        const userOtp = await this.prisma.userOtp.findFirst({
            where: {
                user: { id: userId },
                otp,
                expiresAt: { gt: new Date() },
            },
        });
        return !!userOtp;
    }
}
