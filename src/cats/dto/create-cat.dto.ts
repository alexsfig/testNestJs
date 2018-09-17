import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../../user/user.entity';

export class CreateCatDto {
  id: number
  @ApiModelProperty() @IsNotEmpty()
  name: string;

  @ApiModelProperty() @IsNumber()
  age: number;

  @ApiModelProperty() @IsNotEmpty()
  breed: string;

  @ApiModelProperty()
  user: User;

}
