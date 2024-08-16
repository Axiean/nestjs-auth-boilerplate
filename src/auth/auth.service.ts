import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { EXCEPTION_RESPONSE } from 'src/shared/config';
import { TOKEN_TYPE } from 'src/shared/types';
import { handleAsyncOperation, validateHashedString } from 'src/shared/utils';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import { forgotPassSetNewPasswordInputDto, loginInputDto, loginOutputDto, SignupWithCredenetialsInputDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  public async signup(credentials: SignupWithCredenetialsInputDto) {
    return handleAsyncOperation(async () => {
      const { email, ip } = credentials;
      const existingUser = await this.userService.findUserByEmail(email);
      if (existingUser) throw new ConflictException(EXCEPTION_RESPONSE.SIGNUP_EMIAL_IN_USE);
      const user = await this.userService.createNewUser(credentials);

      // ...handle any otp creation an/or return logic here
    }, 'Error during Signup');
  }

  // *********************
  public async login(body: loginInputDto): Promise<loginOutputDto> {
    return handleAsyncOperation(async () => {
      const { email, password } = body;
      const user = await this.userService.findUserByEmail(email);
      if (!user) throw new BadRequestException(EXCEPTION_RESPONSE.LOGIN_BAD_CREDENTIAL);
      const validPassword = validateHashedString(password, user.password);
      if (!validPassword) throw new BadRequestException(EXCEPTION_RESPONSE.LOGIN_BAD_CREDENTIAL);
      const tokens = await this.tokenService.generateAuthTokens(user);
      return { user, tokens };
    }, 'Error during login');
  }

  // *********************
  public async forgotPassUsingEmail(email: string) {
    return handleAsyncOperation(async () => {
      const user = await this.userService.findUserByEmail(email);
      // await this.otpService.createAndSendOtp(user, OTP_TYPES.FORGOT_PASS);
      return `OTP has sent to email: ${email}`;
    }, 'error restoring password');
  }

  // *********************
  public async forgotPassValidateOtp(email: string, otp: string) {
    return handleAsyncOperation(async () => {
      const user = await this.userService.findUserByEmail(email);
      // await this.otpService.verifyForgotPassOtp(user.id, otp);
      return await this.tokenService.generateResetPassToken(user);
    }, 'error validating otp');
  }

  // *********************
  public async forgotPassSetNewPassword(body: forgotPassSetNewPasswordInputDto) {
    return handleAsyncOperation(async () => {
      const { password, token } = body;
      const payload = await this.tokenService.verifyToken(token, TOKEN_TYPE.RESET_PASSWORD);
      return await this.userService.changeUserPassword(payload.sub, password);
    }, 'error updating password');
  }
}
