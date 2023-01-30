import { AxiosError } from 'axios';
import { AppThunk } from '..';
import {
  login
} from '../../api/authetication'
import {
  UserCredentials
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
      console.log(err)
      throw err.response?.data ? err.response?.data : err.message;
    }
  };
};
