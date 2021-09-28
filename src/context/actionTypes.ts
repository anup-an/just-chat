export const LOGIN_USER = 'LOGIN_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export type Action = {
  type: 'LOGIN_USER' | 'SIGNUP_USER' | 'LOGOUT_USER';
  payload: {
    user: IUser;
  };
};

export interface IUser {
  email: string;
  password: string;
  image: '';
  friendsList: [];
}
