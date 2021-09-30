import React, {useReducer, createContext} from 'react';
import {
  IUser,
  LOGOUT_USER,
  LOGIN_USER,
  SIGNUP_USER,
  Action,
} from './actionTypes';

export const UserContext = createContext(initialState);

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, user: {...action.payload.user}};
    case LOGOUT_USER:
      return {...state, user: {...action.payload.user}};
    case SIGNUP_USER:
      return {...state, user: {...action.payload.user}};
  }
};

const initialState: IUser = {
  user: {
    uid: '',
    email: '',
  },
};

export const AppContextProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const logInUser = (user: IUser) => {
    dispatch({
      type: 'LOGIN_USER',
      payload: {
        user: user,
      },
    });
  };

  const signUpUser = (user: IUser) => {
    dispatch({
      type: 'SIGNUP_USER',
      payload: {
        user: user,
      },
    });
  };

  return (
    <UserContext.Provider value={{user: state.user, logInUser, signUpUser}}>
      {children}
    </UserContext.Provider>
  );
};
