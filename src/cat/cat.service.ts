import { Injectable, Inject, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import {ErrorTypeEnum} from '../error_handler/ErrorTypeEnum';
import {AppError} from '../error_handler/AppError';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private readonly CatRepository: Repository<Cat>,
  ) {}

  async findAll(): Promise<Cat[]> {
    return await this.CatRepository.find();
  }

  async findOne(id): Promise<Cat>{
    let cat = await this.CatRepository.findOne(id);
    if(!cat) throw new AppError(ErrorTypeEnum.NOT_IN_DB, Cat.name);
    return cat;
  }

  async create(@Body() Cat: Cat): Promise<Cat> {
    return await this.CatRepository.save(Cat);
  }

  async delete(id): Promise<any>{
    let cat = await this.CatRepository.findOne(id);
    if(!cat) throw new AppError(ErrorTypeEnum.NOT_IN_DB, Cat.name);
    return await this.CatRepository.remove(cat);
  }

  async update(id, @Body() Cat: Cat ): Promise<any>{
    let cat = await this.CatRepository.update(id, Cat);
    if(!cat) throw new AppError(ErrorTypeEnum.NOT_IN_DB, Cat.name);
    let catUpdated = await this.CatRepository.findOne(id);
    return catUpdated;
  }

}
