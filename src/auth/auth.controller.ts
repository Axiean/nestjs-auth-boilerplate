import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RealIP } from 'nestjs-real-ip';
import { EXCEPTION_RESPONSE } from 'src/shared/config';
import { CurrentUser } from 'src/shared/decorators';
import { Serialize } from 'src/shared/interceptors';
import { User } from 'src/user/models/user.entity';
import { AuthService } from './auth.service';
import { forgotPassSetNewPasswordInputDto, loginInputDto, loginOutputDto, SignupWithCredenetialsInputDto, validateForgotPassOutputDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  // @Serialize(otpExpireDto)
  // @ApiCreatedResponse({ description: 'Signup Result', type: otpExpireDto })
  async signup(@Body() body: SignupWithCredenetialsInputDto, @RealIP() ip: string) {
    body.ip = ip;
    return await this.authService.signup(body);
  }

  @Post('/login')
  @Serialize(loginOutputDto)
  @ApiCreatedResponse({ description: 'Login Result', type: loginOutputDto, isArray: false })
  @ApiBadRequestResponse({ description: EXCEPTION_RESPONSE.LOGIN_BAD_CREDENTIAL.message })
  async login(@Body() body: loginInputDto) {
    return await this.authService.login(body);
  }

  @Get('/verify-email/:OTP')
  @ApiParam({ name: 'OTP', type: String })
  @ApiOkResponse({ type: Boolean })
  @ApiBearerAuth('access-token')
  async verifyPhoneNumberUsingOtp(@CurrentUser() user: User, @Param('OTP') OTP: string) {
    // return await this.otpService.verifyEamilUsingOtp(user.id, OTP);
  }

  @Get('/forgot-pass-otp-request/email/:email')
  // @StringResponse()
  @ApiParam({ name: 'email', type: String })
  async forgotPassUsingPhoneNumber(@Param('email') email: string) {
    return await this.authService.forgotPassUsingEmail(email);
  }

  @Get('/forgot-pass-validate-otp')
  @Serialize(validateForgotPassOutputDto)
  @ApiOkResponse({ type: validateForgotPassOutputDto })
  @ApiQuery({ name: 'otp', type: String })
  @ApiQuery({ name: 'email', type: String })
  async forgotPassValidateOtp(@Query('otp') otp: string, @Query('email') phoneNumber: string) {
    return await this.authService.forgotPassValidateOtp(phoneNumber, otp);
  }

  @Post('/forgot-pass-set-new')
  @Serialize(loginOutputDto)
  async forgotPassSetNewPassword(@Body() body: forgotPassSetNewPasswordInputDto) {
    return await this.authService.forgotPassSetNewPassword(body);
  }
}
