import React, {createContext, useReducer} from 'react';
import { User } from '../interfaces/AppInterfaces';
import authReducer from './authReducer';


export interface AuthState {
  errorMessage: string,
  token: string | null,
  user: User | null,
  status: 'checking' | 'authenticated' | 'not-authenticated'
}

export const authInitialState: AuthState = {
  errorMessage:'',
  token:null,
  user:null,
  status: 'checking',
}

export type AuthContextProps = {
  errorMessage: string,
  token: string | null,
  user: User | null,
  status: 'checking' | 'authenticated' | 'not-authenticated'
  signUp: () => void,
  login: () => void,
  logout: () => void,
  removeError: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

const AuthProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)
  
  const signUp = () => {
    
  }

  const login = () => {
    
  }  

  const logout = () => {
    
  }

  const removeError = () => {
    
  }  
  
  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        login,
        logout,
        removeError
      }}
    > 
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider