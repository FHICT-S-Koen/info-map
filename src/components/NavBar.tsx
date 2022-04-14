import ThemeSelector from './ThemeSelector'

export default function NavBar() {
  return (
    <nav className="relative flex mx-4 py-4 dark:bg-slate-700 border-b-2 border-gray-100 dark:border-slate-600">
      <ThemeSelector />
    </nav>
  )
}