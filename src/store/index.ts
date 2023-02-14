import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
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

// export type AppDispatch = Store['dispatch']
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

// // export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: false,
})
