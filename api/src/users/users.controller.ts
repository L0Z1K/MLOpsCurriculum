import { updateUserDTO } from './dto/update-user.dto';
import { createUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') userId: number) {
    return this.usersService.getOne(userId);
  }

  @Post()
  create(@Body() userData: createUserDTO) {
    return this.usersService.create(userData);
  }

  @Put('/:id')
  update(@Param('id') userId: number, @Body() updateUserData: updateUserDTO) {
    return this.usersService.update(userId, updateUserData);
  }

  @Delete('/:id')
  remove(@Param('id') userId: number) {
    return this.usersService.delete(userId);
  }
}
