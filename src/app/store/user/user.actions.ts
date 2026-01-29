import { createAction, props } from '@ngrx/store';

export const login = createAction('[User] Login', props<{ email: string }>());
export const logout = createAction('[User] Logout');
