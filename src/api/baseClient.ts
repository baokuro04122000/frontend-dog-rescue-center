import { EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, Store } from "../store";

let store: Store;

export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://54.255.180.132:8080/v1';

const baseClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export const injectStore = (_store: EnhancedStore<RootState>) =>
  (store = _store);

baseClient.interceptors.request.use(async (config) => {
  const { authUser } = store.getState().authentication;

  if (!authUser?.accessToken || !config.headers) return config;

  //add access_token to header Authorization
  config.headers.set = `Bearer ${authUser.accessToken}`;
  return config;
});

export default baseClient;