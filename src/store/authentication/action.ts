import { AxiosError } from 'axios';
import { AppThunk } from '..';
import {
  login,
  register,
  emailForgotPassword,
  resetPassword
} from '../../api/authetication'
import {
  EmailConfirmResetPassword,
  UserCredentials,
  UserSignUp,
  ResetPassword
} from '../../api/openapi-generator'
import { setAuthUser } from './slice';
export const actionLogin = (
  auth: UserCredentials
): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    try {
      const { data } = await login(auth);
      await dispatch(setAuthUser(data));
    } catch (error) {
      const err = error as AxiosError
      throw err.response?.data ? err.response?.data : err.message;
    }
  };
};

export const actionRegister = (
  user: UserSignUp
): AppThunk<Promise<string>> => {
  return async () => {
    try {
      const { data } = await register(user)
      return data.message ? data.message : 'Internal server error'
    } catch (error) {
      const err = error as AxiosError
      throw err.response?.data ? err.response?.data : err.message;
    }
  }
}

export const actionEmailForgotPassword = (
  email: EmailConfirmResetPassword
): AppThunk<Promise<string>> => {
  return async () => {
    try {
      const {data} = await emailForgotPassword(email)
      return data.message ? data.message : ''
    } catch (error) {
      const err = error as AxiosError
      throw err.response?.data ? err.response?.data : err.message;
    }
  }
}

export const actionResetPassword = (
  reset: ResetPassword
): AppThunk<Promise<string>> => {
  return async () => {
    try {
      const {data} = await resetPassword(reset)
      return data.message ? data.message : ''
    } catch (error) {
      const err = error as AxiosError
      throw err.response?.data ? err.response?.data : err.message;
    }
  }
}