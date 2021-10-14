import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productsApi from '../api/productsApi';
import { User, LoginResponse, LoginData, RegisterData } from '../interfaces/AppInterfaces';
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
  signUp: (data: RegisterData) => void,
  login: (data: LoginData) => void,
  logout: () => void,
  removeError: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

const AuthProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)

  useEffect(() => {
    checkToken()
  }, [])
  
  const signUp = async ({correo, nombre, password} : RegisterData) => {
    try {
      await productsApi.post<LoginResponse>('/usuarios', { correo, nombre, password })
      login({correo, password})
    } catch (error: any) {
      dispatch({type: 'addError', payload: error.response.data.errors[0].msg || 'That email is already registered'})
    }
  }

  const login = async ({correo, password}: LoginData) => {
    try {
      const { data: { token, usuario } } = await productsApi.post<LoginResponse>('/auth/login', {
        correo,
        password
      })
      await AsyncStorage.setItem('token', token)
      dispatch({type: 'signIn', payload: { token, user: usuario }})
    } catch (error: any) {
      dispatch({type: 'addError', payload: error.response.data.msg || 'Información incorrecta'})
    }
  }  

  const logout = async () => {
    await AsyncStorage.removeItem('token')
    dispatch({type: 'logout'})
  }

  const removeError = () => {
    dispatch({ type: 'removeError' })
  }  
  
  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token')
    if(!token){
      return dispatch({ type: 'notAuthenticated' })
    } else {
      const res = await productsApi.get<LoginResponse>('/auth')
      if(res.status !== 200){
        return dispatch({ type:'notAuthenticated' })
      }
      await AsyncStorage.setItem('token', token)
      dispatch({type: 'signIn', payload: { token: res.data.token, user: res.data.usuario }})
    }
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