import { createSelector } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { RootState } from "..";
import { JWTPayload } from "../../interfaces/authentication";

export const selectAuthentication = (state: RootState) => state.authentication;

export const selectIsAuth = createSelector(selectAuthentication, (auth) => {
  const token = auth.authUser?.accessToken;
  if (!token) return false;
  const { exp } = jwtDecode<JWTPayload>(token);
  const now = new Date().getTime();
  if (now > exp * 1000) return false;
  return true;
});