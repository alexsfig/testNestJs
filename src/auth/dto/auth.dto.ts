import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()  @IsNotEmpty()
  password: string;
}
