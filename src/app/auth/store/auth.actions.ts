import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] LOGIN_START';
export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE_FAIL';
export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE_SUCCESS';
export const LOGOUT = '[Auth] LOGOUT';
export const SIGNUP_START = '[Auth] SIGNUP_START';
export const HANDLE_ERROR = '[Auth] HANDLE_ERROR';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';


export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
    payload?: any;
}

export class HandleError implements Action {
    readonly type = HANDLE_ERROR;
    payload?: any;
}
export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: {email: string; password: string}) {}
}

export class LoginStart implements Action {
    readonly type: string = LOGIN_START;
    constructor(public payload: {email: string; password: string}) {}
}

export class AuthenticateFail {
    readonly type = AUTHENTICATE_FAIL;
    constructor(public readonly payload: string) {}
}

export class AuthenticateSucess implements Action {
    readonly type: string = AUTHENTICATE_SUCCESS;
    constructor(public payload: {
        email: string,
        token: string,
        expTime: string,
        redirect: boolean
    }) {}
}

export class Logout implements Action {
    readonly type: string = LOGOUT;
    payload?: any;
}

export type AuthActions = AuthenticateSucess | Logout | LoginStart | AuthenticateFail | SignupStart | HandleError | AutoLogin;