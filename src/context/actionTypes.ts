export const LOGIN_USER = 'LOGIN_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export type Action = {
  type: 'LOGIN_USER' | 'SIGNUP_USER' | 'LOGOUT_USER';
  payload: {
    user: IUser;
  };
};

export interface IFile {
  fileCopyUri?: string;
  name: string;
  size: string;
  type: string;
  uri: string;
}

export interface IUser {
  uid: string;
  email: string;
}

export interface IMessage {
  sender: string;
  receiver: string;
  message: string;
  image: string;
  file: string;
  status: string;
}

export interface FriendRequest {
  sender: string;
  receiver: string;
  senderEmail: string;
  receiverEmail: string;
  status: string;
}
