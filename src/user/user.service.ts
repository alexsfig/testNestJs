import { Injectable, Inject, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id){
    let cat = await this.userRepository.findOne(id);
    if(!cat) return { 'Error': 'Cat does not exist' };
    return cat;
  }


  async create(@Body() user: User) {
    const createdCat = await this.userRepository.save(user);
    return { cat: createdCat };
  }

  async delete(id){
    let cat = await this.userRepository.findOne(id);
    if(!cat) return { 'Error': 'Cat does not exist' };
    return await this.userRepository.remove(cat);
  }

  async update(id, @Body() user: User ){
    let cat = await this.userRepository.update(id, user);
    if(!cat) return { 'Error': 'Cat does not exist' };
    let catUpdated = await this.userRepository.findOne(id);
    return catUpdated;
  }

}
