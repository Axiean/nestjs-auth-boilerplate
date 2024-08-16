import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

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

export class userInfo {
  @Expose()
  @ApiProperty()
  readonly id: string;

  @Expose()
  @ApiProperty()
  readonly email: string;

  @Expose()
  @ApiProperty()
  readonly name: string;

  @Expose()
  @ApiProperty()
  readonly phoneNumber: string;

  @Expose()
  @ApiProperty()
  readonly isEmailVerified: boolean;

  @Expose()
  @ApiProperty()
  readonly isPhoneNumberVerified: boolean;
}

export class loginOutputDto {
  @ApiProperty({ type: accessAndRefreshTokenDto, required: true })
  @Type(() => accessAndRefreshTokenDto)
  @ValidateNested()
  @IsNotEmpty()
  @Expose()
  readonly tokens: accessAndRefreshTokenDto;

  @ApiProperty({ type: userInfo, required: true })
  @Type(() => userInfo)
  @ValidateNested()
  @IsNotEmpty()
  @Expose()
  readonly user: userInfo;
}
