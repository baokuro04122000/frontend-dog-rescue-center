
import baseClient, { BASE_URL } from "./baseClient"
import {
  AuthApiFactory,
  UserCredentials,
  UserSignUpRequest
} from './openapi-generator'

const authApiFactory = AuthApiFactory(undefined,BASE_URL, baseClient)

export const login = (data: UserCredentials) => {
  return authApiFactory.authSignInPost(data)
}

export const register = (data: UserSignUpRequest) => {
  return authApiFactory.authSignUpPost(data)
}