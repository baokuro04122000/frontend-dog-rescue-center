
import baseClient, { BASE_URL } from "./baseClient"
import {
  AuthApiFactory,
  EmailConfirmResetPassword,
  ResetPassword,
  UserCredentials,
  UserSignUp
} from './openapi-generator'

const authApiFactory = AuthApiFactory(undefined,BASE_URL, baseClient)

export const login = (data: UserCredentials) => {
  return authApiFactory.authSignInPost(data)
}

export const register = (data: UserSignUp) => {
  return authApiFactory.authSignUpPost(data)
}

export const emailForgotPassword = (data: EmailConfirmResetPassword) => {
  return authApiFactory.authEmailResetPasswordPost(data)
}

export const resetPassword = (data: ResetPassword) => {
  return authApiFactory.authResetPost(data)
}