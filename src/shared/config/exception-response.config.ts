enum ErrorMessages {
  SIGNUP_EMIAL_IN_USE = 'SIGNUP_EMIAL_IN_USE',
  LOGIN_BAD_CREDENTIAL = 'LOGIN_BAD_CREDENTIAL',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  WRONG_OTP = 'WRONG_OTP',
  AUTHORIZATION_REQUIRED = 'AUTHORIZATION_REQUIRED',
  EMIAL_IS_NOT_VERIFIED = 'EMIAL_IS_NOT_VERIFIED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  BAD_TOKEN_FORMAT = 'BAD_TOKEN_FORMAT',
  AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
  ALREADY_VERIFIED_EMAIL = 'ALREADY_VERIFIED_EMAIL',
  ACCESS_DENIED = 'ACCESS_DENIED',

  // Add more error messages as needed
}

export const EXCEPTION_RESPONSE: Record<ErrorMessages, { code: number; message: string }> = {
  [ErrorMessages.SIGNUP_EMIAL_IN_USE]: {
    code: 1,
    message: 'account with this email exists',
  },
  [ErrorMessages.LOGIN_BAD_CREDENTIAL]: {
    code: 2,
    message: 'email or password is wrong',
  },
  [ErrorMessages.USER_NOT_FOUND]: {
    code: 3,
    message: 'user not found',
  },

  [ErrorMessages.WRONG_OTP]: {
    code: 4,
    message: 'OTP is not correct',
  },
  [ErrorMessages.AUTHORIZATION_REQUIRED]: {
    code: 6,
    message: 'login needed',
  },
  [ErrorMessages.EMIAL_IS_NOT_VERIFIED]: {
    code: 7,
    message: 'emeail verification needed',
  },
  [ErrorMessages.TOKEN_EXPIRED]: {
    code: 8,
    message: 'session expired',
  },
  [ErrorMessages.INVALID_TOKEN]: {
    code: 9,
    message: '',
  },
  [ErrorMessages.BAD_TOKEN_FORMAT]: {
    code: 10,
    message: '',
  },
  [ErrorMessages.AUTHORIZATION_FAILED]: {
    code: 11,
    message: 'authorization failed',
  },
  [ErrorMessages.ALREADY_VERIFIED_EMAIL]: {
    code: 12,
    message: 'email is already verified',
  },
  [ErrorMessages.ACCESS_DENIED]: {
    code: 13,
    message: 'access denied',
  },

  // Add more error messages as needed
};
