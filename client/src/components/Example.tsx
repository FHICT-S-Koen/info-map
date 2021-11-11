import { useContext } from 'react'
import { Context } from '../Store'

const Example = () => {
  const store = useContext(Context)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.setState({...Context, text: e.target.value})
  }
  
  return <><div>You typed: {store.state.text}</div><input type="text" onChange={handleChange} /></>
}

export default Example
