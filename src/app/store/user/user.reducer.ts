import { createReducer, on } from '@ngrx/store';
import { login, logout } from './user.actions';

export interface UserState { email: string | null }

export const initialState: UserState = { email: null };

export const userReducer = createReducer(
  initialState,
  on(login, (state, { email }) => {
    localStorage.setItem('user_email', email); // sauvegarde email
    return { ...state, email };
  }),
  on(logout, () => {
    localStorage.removeItem('user_email');
    return { email: null };
  })
);
