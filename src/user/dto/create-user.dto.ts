import { ApiModelProperty } from '@nestjs/swagger';
import { Cats } from '../../cats/cats.entity';

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

}
