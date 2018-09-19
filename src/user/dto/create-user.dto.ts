import { ApiModelProperty } from '@nestjs/swagger';
import { Cat } from '../../cat/cat.entity';

export class CreateUserDto {
  id: number;
  @ApiModelProperty()
  firstName: string;

  @ApiModelProperty()
  lastName: string;

  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  password: string;

  cats: Cat[]

  private
  createPassword: any;
  updatePassword: any;
}
