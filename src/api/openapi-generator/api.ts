/* tslint:disable */
/* eslint-disable */
/**
 * DRC API document
 * This is a Dog Rescue Center
 *
 * The version of the OpenAPI document: 1.0.1
 * Contact: tdbao1@cmcglobal.vn
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * The response send all apis that it return message success
 * @export
 * @interface AnnounceResponse
 */
export interface AnnounceResponse {
    /**
     * 
     * @type {number}
     * @memberof AnnounceResponse
     */
    'status'?: number;
    /**
     * 
     * @type {AnnounceResponseData}
     * @memberof AnnounceResponse
     */
    'data'?: AnnounceResponseData;
}
/**
 * 
 * @export
 * @interface AnnounceResponseData
 */
export interface AnnounceResponseData {
    /**
     * 
     * @type {string}
     * @memberof AnnounceResponseData
     */
    'message'?: string;
}
/**
 * Error responses are sent when an error (e.g. unauthorized, bad request) occurred.
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * 
     * @type {ErrorResponseErrors}
     * @memberof ErrorResponse
     */
    'errors'?: ErrorResponseErrors;
    /**
     * 
     * @type {number}
     * @memberof ErrorResponse
     */
    'status'?: number;
    /**
     * Show detail any data that the backend wanna return to more about details
     * @type {object}
     * @memberof ErrorResponse
     */
    'data'?: object;
}
/**
 * Error object
 * @export
 * @interface ErrorResponseErrors
 */
export interface ErrorResponseErrors {
    /**
     * 
     * @type {string}
     * @memberof ErrorResponseErrors
     */
    'message'?: string;
}
/**
 * 
 * @export
 * @interface UserCredentialResponse
 */
export interface UserCredentialResponse {
    /**
     * 
     * @type {string}
     * @memberof UserCredentialResponse
     */
    'accessToken'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserCredentialResponse
     */
    'refreshToken'?: string;
    /**
     * 
     * @type {UserCredentialResponseData}
     * @memberof UserCredentialResponse
     */
    'data'?: UserCredentialResponseData;
}
/**
 * 
 * @export
 * @interface UserCredentialResponseData
 */
export interface UserCredentialResponseData {
    /**
     * 
     * @type {number}
     * @memberof UserCredentialResponseData
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof UserCredentialResponseData
     */
    'email'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserCredentialResponseData
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserCredentialResponseData
     */
    'avatar'?: string;
}
/**
 * 
 * @export
 * @interface UserCredentials
 */
export interface UserCredentials {
    /**
     * 
     * @type {string}
     * @memberof UserCredentials
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof UserCredentials
     */
    'password': string;
}
/**
 * 
 * @export
 * @interface UserSignUpRequest
 */
export interface UserSignUpRequest {
    /**
     * 
     * @type {string}
     * @memberof UserSignUpRequest
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof UserSignUpRequest
     */
    'password': string;
    /**
     * 
     * @type {string}
     * @memberof UserSignUpRequest
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof UserSignUpRequest
     */
    'avatar'?: string;
}

/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * User Login by Email and Password 
         * @param {UserCredentials} [userCredentials] email and password
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authSignInPost: async (userCredentials?: UserCredentials, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/auth/sign-in`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userCredentials, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * User register account to access the website to use full features of website
         * @param {UserSignUpRequest} [userSignUpRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authSignUpPost: async (userSignUpRequest?: UserSignUpRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/auth/sign-up`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userSignUpRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration)
    return {
        /**
         * User Login by Email and Password 
         * @param {UserCredentials} [userCredentials] email and password
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authSignInPost(userCredentials?: UserCredentials, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserCredentialResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authSignInPost(userCredentials, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * User register account to access the website to use full features of website
         * @param {UserSignUpRequest} [userSignUpRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authSignUpPost(userSignUpRequest?: UserSignUpRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AnnounceResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authSignUpPost(userSignUpRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthApiFp(configuration)
    return {
        /**
         * User Login by Email and Password 
         * @param {UserCredentials} [userCredentials] email and password
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authSignInPost(userCredentials?: UserCredentials, options?: any): AxiosPromise<UserCredentialResponse> {
            return localVarFp.authSignInPost(userCredentials, options).then((request) => request(axios, basePath));
        },
        /**
         * User register account to access the website to use full features of website
         * @param {UserSignUpRequest} [userSignUpRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authSignUpPost(userSignUpRequest?: UserSignUpRequest, options?: any): AxiosPromise<AnnounceResponse> {
            return localVarFp.authSignUpPost(userSignUpRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * User Login by Email and Password 
     * @param {UserCredentials} [userCredentials] email and password
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authSignInPost(userCredentials?: UserCredentials, options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).authSignInPost(userCredentials, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * User register account to access the website to use full features of website
     * @param {UserSignUpRequest} [userSignUpRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authSignUpPost(userSignUpRequest?: UserSignUpRequest, options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).authSignUpPost(userSignUpRequest, options).then((request) => request(this.axios, this.basePath));
    }
}


