import { useAuth0 } from '@auth0/auth0-react'
import { LoginIcon } from '@heroicons/react/outline'

export default function LoginButton() {
  const {loginWithRedirect} = useAuth0()
  return <button
    className="rounded-md p-2 shadow flex item-center dark:bg-slate-800 dark:text-white"
    onClick={() => loginWithRedirect()}>
      Log In
    <LoginIcon className="h-6 w-5 ml-2"/>
  </button>
}
