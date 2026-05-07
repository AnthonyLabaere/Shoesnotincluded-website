import {
  configureStore,
  ThunkAction,
  UnknownAction,
} from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { Store } from 'redux'

import userReducer from './userSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  })
export const store = makeStore()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

// Wrapper Next.js (next-redux-wrapper) — assemble le store côté SSR/CSR
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: false,
})
