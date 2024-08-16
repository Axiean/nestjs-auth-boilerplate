import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class idDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @Expose()
  id: string;
}
