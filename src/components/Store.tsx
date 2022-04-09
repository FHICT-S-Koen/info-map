import { createContext, FC, Dispatch, useReducer } from 'react'

const initialState = {
  coords: {
    x: 0,
    y: 0
  }
}

type Action =
  | { type: 'updateCoords', payload: [number, number] }
  | { type: 'resetCoords' }

const reducer = (state = initialState, action: Action): InitialState => {
  switch (action.type) {
    case 'updateCoords':
      return {...state, coords: { x: state.coords.x+action.payload[0] , y: state.coords.y+action.payload[1] } }
    case 'resetCoords':
        return {...state, coords: { x: 0 , y: 0 } }
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
