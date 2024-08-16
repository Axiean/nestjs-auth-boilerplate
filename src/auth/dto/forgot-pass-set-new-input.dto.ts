import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class forgotPassSetNewPasswordInputDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsJWT()
  token: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
