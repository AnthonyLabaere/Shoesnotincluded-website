import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
import { HYDRATE } from 'next-redux-wrapper'

import * as Types from '../types'
import { RootState } from '.'

export interface UserState {
  user?: Types.UserDocument
}

const initialState: UserState = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    [`${HYDRATE}`]: (state, action: PayloadAction<User>) => {
      //       // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload }
      //       const stateDiff = diff(state, action.payload) as any;
      //       const wasBumpedOnClient = stateDiff?.page?.[0]?.endsWith('X'); // or any other criteria
      //       return {
      //         ...state,
      //         ...action.payload,
      //         page: wasBumpedOnClient ? state.page : action.payload.page, // keep existing state or use hydrated
      //       };
    },
    setUser: (state, action: PayloadAction<Types.UserDocument>) => {
      state.user = action.payload
    },
    resetUser: (state) => {
      state.user = undefined
    },
  },
})

export const { setUser, resetUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer
