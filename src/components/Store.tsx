import { createContext, FC, Dispatch, useReducer } from 'react'

const initialState = {
}

type Action =
  | { type: 'example', payload: number }

const reducer = (state = initialState, action: Action): InitialState => {
  switch (action.type) {
    default:
      return state
  }
}

type InitialState = typeof initialState

type InitialContext = [
  state: InitialState,
  dispatch: Dispatch<Action>
]

const initialContextState: InitialContext = [
  initialState,
  () => null
]

export const Context = createContext(initialContextState)

const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <Context.Provider value={[state, dispatch]}>
    {children}
  </Context.Provider>
}

export default StoreProvider
