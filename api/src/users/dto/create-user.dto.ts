import { IsNumber, IsOptional, IsString } from 'class-validator';

export class createUserDTO {
  @IsString({ message: 'name parameter is empty.' })
  readonly name: string;
  @IsOptional()
  @IsNumber(undefined, { message: 'age must be an integer.' })
  readonly age: number;
}
