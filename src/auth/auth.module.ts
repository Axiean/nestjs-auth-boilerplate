import { Module } from '@nestjs/common';

import { TokenService } from 'src/token/token.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
