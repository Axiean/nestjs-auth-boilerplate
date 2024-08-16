import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class accessAndRefreshTokenDto {
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  accessToken: string;

  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  refreshToken: string;
}
