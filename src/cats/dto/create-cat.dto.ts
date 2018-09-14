
import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCatDto {
  id: number
  @ApiModelProperty() @IsNotEmpty()
  name: string;

  @ApiModelProperty() @IsNumber()
  age: number;

  @ApiModelProperty() @IsNotEmpty()
  breed: string;


}
