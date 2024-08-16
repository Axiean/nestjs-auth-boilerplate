import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class SignupWithCredenetialsInputDto {
  @ApiProperty({ type: String, required: true, default: 'axieans@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true, default: 'Vahid Aslani' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true, default: '1234' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmpty()
  ip?: string;
}
