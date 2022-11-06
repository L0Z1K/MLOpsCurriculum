import { IsNumber, IsOptional, IsString } from 'class-validator';

export class createUserDTO {
  @IsString()
  readonly name: string;
  @IsOptional()
  @IsNumber()
  readonly age: number;
}
