import { AxiosError } from 'axios';
import { AppThunk } from '..';
import {
  login,
  register
} from '../../api/authetication'
import {
  UserCredentials,
  UserSignUpRequest
} from '../../api/openapi-generator'
import { AUTH_USER_DATA_LS_ITEM } from '../../constants/authentication';
import { setAuthUser } from './slice';
export const actionLogin = (
  auth: UserCredentials
): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    try {
      const { data } = await login(auth);
      dispatch(setAuthUser(data));
      localStorage.setItem(AUTH_USER_DATA_LS_ITEM, JSON.stringify(data));
    } catch (error) {
      const err = error as AxiosError
      throw err.response?.data;
    }
  };
};

export const actionRegister = (user: UserSignUpRequest
): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    try {
      const { data } = await login(user);
      dispatch(setAuthUser(data));
      localStorage.setItem(AUTH_USER_DATA_LS_ITEM, JSON.stringify(data));
    } catch (error) {
      const err = error as AxiosError
      throw err.response?.data;
    }
  };
};