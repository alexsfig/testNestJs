import { Injectable, Inject, Body, HttpStatus, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {ErrorTypeEnum} from '../error_handler/ErrorTypeEnum';
import {AppError} from '../error_handler/AppError';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private saltRounds = 10;
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

  async findOneByUsername(username): Promise<User> {
    let user = await this.userRepository.findOne({ username: username});
    if(!user)   throw new AppError(ErrorTypeEnum.NOT_FOUND, User.name);
    return user;
  }

  async create(@Body() user: User): Promise<User> {
    user.passwordHash = await this.getHash(user.password);
    user.password = undefined;
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
    user.passwordHash = await this.getHash(user.password);
    user.password = undefined;
    let userUpt =  Object.assign(userFind, user)
    return await this.userRepository.save(userUpt);
  }


  async getHash(password: string|undefined): Promise<string> {
      return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
