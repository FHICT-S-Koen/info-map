import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import axios from 'axios'

export default function Fetch() {
  const { getAccessTokenSilently } = useAuth0()
  const domain = `${process.env.REACT_APP_AUTH0_DOMAIN}`
  const apiURL = `${process.env.REACT_APP_HOST_URL}`

  const [state, setState] = useState('')

  const handleClick = async() => {
    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`, 
      scope: 'read:current_user'
    })
    const response = await axios.get(`${apiURL}/private`, {
      headers: {
        authorization: `Bearer ${accessToken}`
      }})
    setState(response.data)
    console.log(state)
  } 

  return <button onClick={handleClick}>fetch</button>
}
