import { ApiModelProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiModelProperty()
  username: string;
}
