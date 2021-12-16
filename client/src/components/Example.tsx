import { useAuth0 } from '@auth0/auth0-react'
import { useContext } from 'react'
import { Context } from '../Store'
import Fetch from './Fetch'

const Example = () => {
  const { isAuthenticated } = useAuth0()
  const store = useContext(Context)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.setState({...Context, text: e.target.value})
  }

  return <>{ isAuthenticated ? <Fetch /> : undefined }<div>You typed: {store.state.text}</div><input type="text" onChange={handleChange} /></>
}

export default Example
