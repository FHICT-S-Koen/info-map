import { useAuth0 } from '@auth0/auth0-react'
import { LogoutIcon } from '@heroicons/react/outline'

export default function LogoutButton() {
  const {logout} = useAuth0()
  return <button 
    className="text-green-400 rounded-md p-2 bg-gray-100 shadow hover:bg-gray-200 flex item-center" 
    onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    <LogoutIcon className="h-6 w-5 ml-2" />
  </button>
}

