import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { OtpModule } from 'src/otp/otp.module';
import { generateOtp } from 'src/common/utility/otp.util';

@Module({
    imports: [
        PrismaModule,
        UsersModule,
        PassportModule,
        OtpModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'supersecret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule { }