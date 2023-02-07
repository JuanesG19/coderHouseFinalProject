import { Action } from '@ngrx/store';

export const LOGIN = '[login] LOGIN';
export const LOGOUT = '[login] LOGOUT';

export class LoginAction implements Action{
  readonly type = LOGIN
}

export class LogoutAction implements Action{
  readonly type = LOGOUT
}