import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

export default function AuthButton() {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <div className="p-2 dark:bg-slate-800 dark:text-white">loading ...</div>
  else return isAuthenticated ? <LogoutButton /> : <LoginButton />
}
