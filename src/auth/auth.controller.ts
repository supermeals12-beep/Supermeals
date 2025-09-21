import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register-user')
    async registerUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.registerUser(createUserDto);
    }

    @Post('register-admin')
    async registeradmin(@Body() createUserDto: CreateUserDto) {
        return this.authService.registeradmin(createUserDto);
    }

    @Post('login')
    async login(@Body() logindto: LoginDto) {
        return this.authService.login(logindto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout() {
        return this.authService.logout();
    }
}
