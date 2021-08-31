import { AuthState } from './AuthContext';
import { User } from '../interfaces/AppInterfaces';

type authActions = 
| { type: 'signIn', payload: { token: string, user: User } }
| { type: 'addError', payload: string }
| { type: 'removeError', }
| { type: 'logout' }
| { type: 'notAuthenticated' }


const authReducer = (state: AuthState, action: authActions) : AuthState => {
  switch(action.type){
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'not-authenticated',
        token: null,
        errorMessage: action.payload
      }
    case 'removeError':
      return {
        ...state,
        errorMessage: ''
      }
    case 'signIn': 
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      }
    case 'logout':
    case 'notAuthenticated': 
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null,
      }
    default:
      return state;
  }
}

export default authReducer