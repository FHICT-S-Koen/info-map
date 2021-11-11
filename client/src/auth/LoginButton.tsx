import { useAuth0 } from '@auth0/auth0-react'
import { LoginIcon } from '@heroicons/react/outline'

export default function LoginButton() {
  const {loginWithRedirect} = useAuth0()
  return <button 
    className="text-green-400 rounded-md p-2 bg-gray-100 shadow hover:bg-gray-200 flex item-center" 
    onClick={() => loginWithRedirect()}>
      Log In
    <LoginIcon className="h-6 w-5 ml-2"/>
  </button>
}