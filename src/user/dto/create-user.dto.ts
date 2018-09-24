import { ApiModelProperty } from '@nestjs/swagger';
import { Cat } from '../../cat/cat.entity';
import { ObjectID } from 'typeorm';

export class CreateUserDto {
  id: ObjectID;
  @ApiModelProperty()
  firstName: string;

  @ApiModelProperty()
  lastName: string;

  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  password: string;

  passwordHash: string
  cats: Cat[]

  private
  createPassword: any;
  updatePassword: any;
}
