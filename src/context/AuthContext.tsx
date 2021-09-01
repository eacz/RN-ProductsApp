import React, {createContext, useReducer} from 'react';
import productsApi from '../api/productsApi';
import { User, LoginResponse, LoginData } from '../interfaces/AppInterfaces';
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
  login: (data: LoginData) => void,
  logout: () => void,
  removeError: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

const AuthProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)
  
  const signUp = () => {
    
  }

  const login = async ({correo, password}: LoginData) => {
    try {
      const { data: { token, usuario } } = await productsApi.post<LoginResponse>('/auth/login', {
        correo,
        password
      })
      dispatch({type: 'signIn', payload: { token, user: usuario }})
    } catch (error) {
      dispatch({type: 'addError', payload: error.response.data.msg || 'Información incorrecta'})
    }
  }  

  const logout = () => {
    
  }

  const removeError = () => {
    dispatch({ type: 'removeError' })
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