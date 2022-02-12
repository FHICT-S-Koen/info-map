import AuthButton from '../auth/AuthButton'
import ThemeSelector from './ThemeSelector'

export default function NavBar() {
  return (
    <div className="relative px-4 dark:bg-slate-700">
      <div className="flex justify-between border-b-2 border-gray-100 dark:border-slate-600 py-4">
        <div></div>
        <div className='flex gap-6'>
          <ThemeSelector />
          <AuthButton />
        </div>
      </div>
    </div>
  )
}