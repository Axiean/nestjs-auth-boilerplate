import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class searchUserEmailOutputDto {
  @ApiProperty({ type: String, required: true })
  @Expose()
  id: string;

  @ApiProperty({ type: String, required: true })
  @Expose()
  email: string;

  @ApiProperty({ type: String, required: true })
  @Expose()
  name: string;
}
