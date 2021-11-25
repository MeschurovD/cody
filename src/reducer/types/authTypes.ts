export interface AuthType {
  email: string
  id: string
  token: string
  isAuth: boolean
  isLogin?: boolean
  errorCode: ErrorCode
}

export enum ErrorCode {
  NOT_ERROR = '',
  INVALID_EMAIL = 'auth/invalid-email',
  WRONG_PASSWORD = 'auth/wrong-password',
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  USER_NOT_FOUND = 'auth/user-not-found'
}