import { ThemeName } from '../types';

export const CHANGE_THEME = 'CHANGE_THEME';
export const changeTheme = (theme: ThemeName) => ({
    type: CHANGE_THEME,
    payload: theme,
});


export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const changeEmail = (email: string) => ({
    type: CHANGE_EMAIL,
    payload: email,
});