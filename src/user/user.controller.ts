import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { FindOneParams } from '../helpers/find_one_params';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './user.entity';


@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.userService.findOne(params);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  delete(@Param() params: FindOneParams) {
    return this.userService.delete(params);
  }

  @Put(':id')
  update(@Param() params: FindOneParams, @Body() createUserDto: CreateUserDto) {
    return this.userService.update(params, createUserDto);
  }

}
