import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cats } from './cats.entity';
import { FindOneParams } from '../helpers/find_one_params';
import { CreateCatDto } from './dto/create-cat.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('cats')
@Controller('cats')
export class CatsController {

  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Promise<Cats[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.catsService.findOne(params);
  }

  @Post()
  create(@Body() createCatsDto: CreateCatDto) {
    return this.catsService.create(createCatsDto);
  }

  @Delete(':id')
  delete(@Param() params: FindOneParams) {
    return this.catsService.delete(params);
  }

  @Put(':id')
  update(@Param() params: FindOneParams, @Body() createCatsDto: CreateCatDto) {
    return this.catsService.update(params, createCatsDto);
  }


}
