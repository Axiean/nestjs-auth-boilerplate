import { BadRequestException, Inject, Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { TokenService } from 'src/token/token.service';

import { EXCEPTION_RESPONSE } from 'src/shared/config';
import { payloadDto } from 'src/token/dto';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import { TOKEN_TYPE } from '../types';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    @Inject(TokenService) private tokenService: TokenService,
    @Inject(UserService) private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next();

    try {
      const { token } = this.parseAuthorizationHeader(authorizationHeader);

      const payload = await this.tokenService.verifyToken(token, TOKEN_TYPE.ACCESS);
      const user = await this.userService.findUserById(payload.sub);

      if (!user) throw new NotFoundException(EXCEPTION_RESPONSE.USER_NOT_FOUND);

      req.currentUser = this.createUserContext(user, payload);

      next();
    } catch (error) {
      // Handle different types of exceptions appropriately
      next(this.handleAuthorizationError(error));
    }
  }

  private parseAuthorizationHeader(header: string): { token: string } {
    const parts = header.split(':::');
    const jwt = parts[0].split(' ');

    if (jwt.length !== 2 || jwt[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    return { token: jwt[1] };
  }

  private createUserContext(user: User, payload: payloadDto): User {
    return {
      id: payload.sub,
      email: payload.email,
      ...user,
    };
  }
  private handleAuthorizationError(error: Error): Error {
    if (error instanceof TokenExpiredError) {
      // Handle token expiration specific logic
      return new UnauthorizedException(EXCEPTION_RESPONSE.TOKEN_EXPIRED);
    } else if (error instanceof JsonWebTokenError) {
      // Handle invalid token specific logic
      return new UnauthorizedException(EXCEPTION_RESPONSE.INVALID_TOKEN);
    } else if (error instanceof SyntaxError) {
      // Handle syntax errors in token
      return new BadRequestException(EXCEPTION_RESPONSE.BAD_TOKEN_FORMAT);
    } else if (error instanceof NotFoundException) {
      // Forward NotFoundException as is
      return error;
    }
    // Default to a general unauthorized error for any other cases
    return new UnauthorizedException(EXCEPTION_RESPONSE.AUTHORIZATION_FAILED);
  }
}
