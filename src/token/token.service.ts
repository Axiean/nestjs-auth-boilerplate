import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TOKEN_CONFIG } from 'src/shared/config';
import { TOKEN_TYPE } from 'src/shared/types';
import { User } from 'src/user/models/user.entity';
import { Repository } from 'typeorm';
import { accessAndRefreshTokenDto, payloadDto } from './dto';
import { Token } from './models/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
    private readonly jwtService: JwtService,
  ) {}

  private async generateJwtToken(user: User, expiresIn: string, type: TOKEN_TYPE): Promise<string> {
    const payload = { sub: user.id, email: user.email, type };
    return this.jwtService.signAsync(payload, { expiresIn });
  }

  public async generateAuthTokens(user: User): Promise<accessAndRefreshTokenDto> {
    const accessToken = await this.generateJwtToken(user, TOKEN_CONFIG.EXP.accessTokenExp, TOKEN_TYPE.ACCESS);
    await this.tokenRepository.delete({ user: { id: user.id } });

    const accessTokenEntity = this.tokenRepository.create({ token: accessToken, user, type: TOKEN_TYPE.ACCESS });
    await this.tokenRepository.save(accessTokenEntity);

    const refreshToken = await this.generateJwtToken(user, TOKEN_CONFIG.EXP.refreshTokenExp, TOKEN_TYPE.REFRESH);
    const refreshTokenEntity = this.tokenRepository.create({ token: refreshToken, user, type: TOKEN_TYPE.REFRESH });
    await this.tokenRepository.save(refreshTokenEntity);

    return { accessToken, refreshToken };
  }

  public async generateResetPassToken(user: User): Promise<Token> {
    await this.tokenRepository.delete({ user: user, type: TOKEN_TYPE.RESET_PASSWORD });
    const resetPassToken = await this.generateJwtToken(user, TOKEN_CONFIG.EXP.resetPassTokenExp, TOKEN_TYPE.RESET_PASSWORD);
    const resetPassTokenEntity = this.tokenRepository.create({ token: resetPassToken, user, type: TOKEN_TYPE.RESET_PASSWORD });
    return await this.tokenRepository.save(resetPassTokenEntity);
  }

  public async verifyToken(token: string, tokenType: TOKEN_TYPE): Promise<payloadDto> {
    const tokenRecord = await this.tokenRepository.findOne({ where: { token: token, type: tokenType } });
    if (!tokenRecord) throw new Error('Token not found');
    const payload = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    if (payload.type !== tokenType) throw new Error('Token type mismatch');
    return payload;
  }
}
