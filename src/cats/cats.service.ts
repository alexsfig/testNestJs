import { Injectable, Inject, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cats } from './cats.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cats)
    private readonly catsRepository: Repository<Cats>,
  ) {}

  async findAll(): Promise<Cats[]> {
    return await this.catsRepository.find();
  }

  async findOne(id){
    let cat = await this.catsRepository.findOne(id);
    if(!cat) return { 'Error': 'Cat does not exist' };
    return cat;
  }


  async create(@Body() cats: Cats) {
    const createdCat = await this.catsRepository.save(cats);
    return { cat: createdCat };
  }

  async delete(id){
    let cat = await this.catsRepository.findOne(id);
    if(!cat) return { 'Error': 'Cat does not exist' };
    return await this.catsRepository.remove(cat);
  }

  async update(id, @Body() cats: Cats ){
    let cat = await this.catsRepository.update(id, cats);
    if(!cat) return { 'Error': 'Cat does not exist' };
    let catUpdated = await this.catsRepository.findOne(id);
    return catUpdated;
  }

}
