import { useAuth0 } from '@auth0/auth0-react'
import { LogoutIcon } from '@heroicons/react/outline'

export default function LogoutButton() {
  const {logout} = useAuth0()
  return <button
    className="rounded-md p-2 shadow flex item-center dark:bg-slate-800 dark:text-white"
    onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    <LogoutIcon className="h-6 w-5 ml-2" />
  </button>
}
