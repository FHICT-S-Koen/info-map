import type { Component } from 'solid-js';
import ThemeSelector from './ThemeSelector'

const NavBar: Component = () => {
  return (
    <nav class="relative flex mx-4 py-4 h-[74px] dark:bg-slate-700 border-b-2 border-gray-100 dark:border-slate-600">
      <ThemeSelector />
    </nav>
  )
}

export default NavBar
