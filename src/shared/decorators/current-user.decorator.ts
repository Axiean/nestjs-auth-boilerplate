import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { User } from 'src/user/models/user.entity';
import { EXCEPTION_RESPONSE } from '../config';
export const CurrentUser = createParamDecorator((data: never, context: ExecutionContext): User => {
  const request: Request = context.switchToHttp().getRequest();
  if (!request.currentUser) throw new UnauthorizedException(EXCEPTION_RESPONSE.AUTHORIZATION_REQUIRED);
  return request.currentUser;
});
