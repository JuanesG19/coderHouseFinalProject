import { Action } from '@ngrx/store';
import { LOGIN, LOGOUT } from '../actions/login.actions';

export function loginReducer(state: Boolean = false, action: Action) {
  switch (action.type) {
    case LOGIN:
      return true;

    case LOGOUT:
      return false;

    default:
      return state;
  }
}
