import { IsNotEmpty } from 'class-validator';
import { TOKEN_TYPE } from 'src/shared/types';

export class payloadDto {
  @IsNotEmpty()
  readonly sub: string;

  @IsNotEmpty()
  readonly iat: number;

  @IsNotEmpty()
  readonly exp: number;

  @IsNotEmpty()
  readonly email?: string;

  @IsNotEmpty()
  readonly type: TOKEN_TYPE;
}
