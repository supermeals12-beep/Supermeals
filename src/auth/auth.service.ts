import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { OtpService } from 'src/otp/otp.service';
import { MailerService } from '@nestjs-modules/mailer';
import { generateOtp } from 'src/common/utility/otp.util';



@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private readonly prisma: PrismaService,
        private jwtService: JwtService,
        private otpService: OtpService,
        private emailService: MailerService
    ) { }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email },
        });
        if (!user) throw new UnauthorizedException('User not found');
        const otp = await this.otpService.createOtpForUser(user.id);
        await this.sendOtp(user.email, otp.otp);
        return { message: 'OTP sent to your email' };
    }


    async registerUser(registerDto: RegisterDto) {
        const { email, } = registerDto;

        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            const otp = await this.otpService.createOtpForUser(existingUser.id);
            this.sendOtp(email, otp.otp)
            return { message: 'OTP sent to your email', userId: existingUser.id };
        }

        const user = await this.usersService.createUser({ ...registerDto });
        const otp = await this.otpService.createOtpForUser(user.id);
        this.sendOtp(email, otp.otp)
        return { message: 'OTP sent to your email', userId: user.id };
    }

    async sendOtp(email: string, otp: string) {
        await this.emailService.sendMail({
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is ${otp}`,
        });
    }

    async registeradmin(registerDto: RegisterDto) {
        const { email } = registerDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            const otp = await this.otpService.createOtpForUser(existingUser.id);
            return { message: 'OTP sent to your email', userId: existingUser.id };
        }
        const user = await this.usersService.createAdmin({ ...registerDto });
        const otp = await this.otpService.createOtpForUser(user.id);
        return { message: 'OTP sent to your email', userId: user.id };
    }

    async verifyUser(email: string, otp: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('User not found');
        const isValid = await this.otpService.verifyOtp(user.id, otp);
        if (!isValid) throw new UnauthorizedException('Invalid OTP');
        if (!user.is_verified) {
            await this.prisma.user.update({
                where: { id: user.id },
                data: { is_verified: true, otpId: null }, // clear OTP link
            });
        }
        if (user.otpId) {
            await this.prisma.userOtp.delete({
                where: { id: user.otpId },
            });

            await this.prisma.user.update({
                where: { id: user.id },
                data: { otpId: null },
            });
        }
        const token = this.generateToken(user);
        return { access_token: token };
    }


    async generateToken(user: any) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }

    //logout can handled on client side
    async logout() {
        return { message: 'Logout successful' };
    }
}
