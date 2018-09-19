import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import * as crypto from 'crypto';
import {ErrorTypeEnum} from '../error_handler/ErrorTypeEnum';
import {AppError} from '../error_handler/AppError';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService
  ) {}

  async createToken(username: string, password: string): Promise<any> {
    const u = await this.usersService.findOneByUsername(username)
    if (u!) {
      if (await this.usersService.compareHash(password, u.passwordHash)) {
        const user: JwtPayload = { username: username };
        const accessToken = this.jwtService.sign(user);
        return {
          expiresIn: 3600,
          accessToken,
          username: username
        };
      }
    }
    throw new AppError(ErrorTypeEnum.INVALID_USER_OR_PASSWORD, undefined);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    return await this.usersService.findOneByUsername(payload.username);
  }
}
