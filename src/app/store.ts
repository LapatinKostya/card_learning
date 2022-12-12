import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { loginReducer, TLoginReducer } from '../features/auth/login/login-reducer'

import { loadingReducer } from './loadingReducer'

export const RootReducer = combineReducers({
  loading: loadingReducer,
  login: loginReducer,
})
export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))

// create custom hook
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// types
export type AppRootStateType = ReturnType<typeof RootReducer>
// all action type
type ActionType = TLoginReducer

// universal thunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  ActionType
>
type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, ActionType>
