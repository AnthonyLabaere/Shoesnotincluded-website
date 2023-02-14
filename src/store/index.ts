import { User } from 'firebase/auth'
import { Context, createWrapper, HYDRATE } from 'next-redux-wrapper'
import { AnyAction, createStore, Store } from 'redux'

import * as Types from '../types'
export type AppDispatch = Store['dispatch']

export interface State {
  tick: string
  userAuth?: null | User
  user?: Types.UserDocument
}

// create your reducer
const reducer = (
  state: State = { tick: 'init', userAuth: null },
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload }
    case 'TICK':
      return { ...state, tick: action.payload }
    case 'SET_USER_AUTH':
      return { ...state, userAuth: action.payload }
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'RESET_USER':
      return { ...state, user: undefined }
    default:
      return state
  }
}

// create your reducer
// const reducer = (state = {tick: 'init'}, action) => {
//   switch (action.type) {
//     case HYDRATE:
//       const stateDiff = diff(state, action.payload) as any;
//       const wasBumpedOnClient = stateDiff?.page?.[0]?.endsWith('X'); // or any other criteria
//       return {
//         ...state,
//         ...action.payload,
//         page: wasBumpedOnClient ? state.page : action.payload.page, // keep existing state or use hydrated
//       };
//     case 'TICK':
//       return {...state, tick: action.payload};
//     default:
//       return state;
//   }
// };

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer)

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true })
