import { createContext, FC, Dispatch, useReducer } from 'react'
import Vec from './canvas/vec'

const initialState = {
  cameraPos: new Vec(0, 0),
  zoom: 1,
}

type Action =
  | { type: 'setCameraPos', payload: Vec }
  | { type: 'setZoom', payload: number }

const reducer = (state = initialState, action: Action): InitialState => {
  switch (action.type) {
    case 'setCameraPos':
      return { ...state, cameraPos: action.payload}
    case 'setZoom':
      return { ...state, zoom: action.payload}
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
