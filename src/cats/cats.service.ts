import { Injectable, Inject, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cats } from './cats.entity';
import {ErrorTypeEnum} from '../error_handler/ErrorTypeEnum';
import {AppError} from '../error_handler/AppError';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cats)
    private readonly catsRepository: Repository<Cats>,
  ) {}

  async findAll(): Promise<Cats[]> {
    return await this.catsRepository.find();
  }

  async findOne(id): Promise<Cats>{
    let cat = await this.catsRepository.findOne(id);
    if(!cat) throw new AppError(ErrorTypeEnum.NOT_IN_DB, Cats.name);
    return cat;
  }

  async create(@Body() cats: Cats): Promise<Cats> {
    return await this.catsRepository.save(cats);
  }

  async delete(id): Promise<any>{
    let cat = await this.catsRepository.findOne(id);
    if(!cat) throw new AppError(ErrorTypeEnum.NOT_IN_DB, Cats.name);
    return await this.catsRepository.remove(cat);
  }

  async update(id, @Body() cats: Cats ): Promise<any>{
    let cat = await this.catsRepository.update(id, cats);
    if(!cat) throw new AppError(ErrorTypeEnum.NOT_IN_DB, Cats.name);
    let catUpdated = await this.catsRepository.findOne(id);
    return catUpdated;
  }

}
