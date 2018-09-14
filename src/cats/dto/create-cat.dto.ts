
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCatDto {
  id: number
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: number;

  @IsNotEmpty()
  breed: string;


}
