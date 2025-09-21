// src/weekly-menu/weekly-menu.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { WeeklyMenuService } from './weekly-menu.service';
import { CreateWeeklyMenuDto } from './dto/create-weekly-menu.dto';
import { UpdateWeeklyMenuDto } from './dto/update-weekly-menu.dto';

@Controller('weekly-menus')
export class WeeklyMenuController {
    constructor(private readonly weeklyMenuService: WeeklyMenuService) { }

    @Post()
    create(@Body() createWeeklyMenuDto: CreateWeeklyMenuDto) {
        return this.weeklyMenuService.create(createWeeklyMenuDto);
    }

    @Get()
    findAll() {
        return this.weeklyMenuService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.weeklyMenuService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateWeeklyMenuDto: UpdateWeeklyMenuDto) {
        return this.weeklyMenuService.update(id, updateWeeklyMenuDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.weeklyMenuService.remove(id);
    }
}
