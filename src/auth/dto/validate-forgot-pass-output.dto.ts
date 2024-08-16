import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class validateForgotPassOutputDto {
  @ApiProperty({ type: String, required: true })
  @Expose()
  token: string;
}
