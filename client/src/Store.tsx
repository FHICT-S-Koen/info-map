import { createContext, useState, FC, SetStateAction, Dispatch } from 'react'

const initialState = {
  text: ''
}

type InitialState = typeof initialState

type InitialContext = {
  state: InitialState;
  setState: Dispatch<SetStateAction<InitialState>>;
}

const initialContextState: InitialContext = {
  state: initialState,
  setState: (state: SetStateAction<InitialState>) => {}
}

export const Context = createContext(initialContextState)

const StoreProvider: FC = ({ children }) => {
  const [state, setState] = useState(initialContextState.state)
  
  return <Context.Provider value={{state, setState}}>
    {children}
  </Context.Provider>
}

export default StoreProvider
