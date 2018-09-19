import { Injectable, Inject, Body, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {ErrorTypeEnum} from '../error_handler/ErrorTypeEnum';
import {AppError} from '../error_handler/AppError';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id): Promise<User> {
    let user = await this.userRepository.findOne(id, { relations: ["cats"] });
    if(!user)  throw new AppError(ErrorTypeEnum.NOT_FOUND, User.name);
    return user;
  }


  async create(@Body() user: User): Promise<User> {
    const obj = this.userRepository.create(user);
    return await this.userRepository.save(obj);

  }

  async delete(id): Promise<any>{
    let user = await this.userRepository.findOne(id) ;
    if(!user)  throw new AppError(ErrorTypeEnum.NOT_FOUND, User.name);
    return await this.userRepository.remove(user);
  }

  async update(id, @Body() user: User ): Promise<any>{
    let userFind = await this.userRepository.findOne(id) ;
    if(!userFind)  throw new AppError(ErrorTypeEnum.NOT_FOUND, User.name);
    let userUpt =  Object.assign(userFind, user)
    return await this.userRepository.save(userUpt);
  }

}
