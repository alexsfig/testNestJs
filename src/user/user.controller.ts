import { Controller, Get, Post, Body, Put, Param, Delete, Query,UseGuards, UseInterceptors,ClassSerializerInterceptor  } from '@nestjs/common';
import { UserService } from './user.service';
import { FindOneParams } from '../helpers/find_one_params';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';


@ApiUseTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({title: 'Get List of All Users'})
  @ApiResponse({ status: 200, description: 'User Found.'})
  @ApiResponse({ status: 404, description: 'No Users found.'})
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param() params: FindOneParams) {
    return this.userService.findOne(params);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  delete(@Param() params: FindOneParams) {
    return this.userService.delete(params);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Param() params: FindOneParams, @Body() createUserDto: CreateUserDto) {
    return this.userService.update(params, createUserDto);
  }
}
