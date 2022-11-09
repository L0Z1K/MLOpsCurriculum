import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  readonly name: string;
  @IsOptional()
  @IsNumber()
  readonly age: number;
}
