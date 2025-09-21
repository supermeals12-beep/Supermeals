import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/decorators/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    //Admin only
    @Get('end-users')
    async findAllEndUsers() {
        return this.usersService.findAllEndUsers();
    }

    //Admin only
    @Get('end-users/:id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    //Admi only

    @Delete('end-users/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.usersService.remove(id);
        return { message: 'User deleted successfully' };
    }
}
