import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CatService } from './cat.service';
import { Cat } from './cat.entity';
import { FindOneParams } from '../helpers/find_one_params';
import { CreateCatDto } from './dto/create-cat.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('Cat')
@Controller()
export class CatController {

  constructor(private readonly CatService: CatService) {}

  @Get()
  findAll(): Promise<Cat[]> {
    return this.CatService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.CatService.findOne(params);
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.CatService.create(createCatDto);
  }

  @Delete(':id')
  delete(@Param() params: FindOneParams) {
    return this.CatService.delete(params);
  }

  @Put(':id')
  update(@Param() params: FindOneParams, @Body() createCatDto: CreateCatDto) {
    return this.CatService.update(params, createCatDto);
  }


}
