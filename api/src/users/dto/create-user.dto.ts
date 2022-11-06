import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class createUserDTO {
  @IsNotEmpty()
  readonly name: string;
  @IsOptional()
  @IsNumber()
  readonly age: number;
}
