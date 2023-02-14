import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { State } from '../store'

const useAppSelector: TypedUseSelectorHook<State> = useSelector

export default useAppSelector
