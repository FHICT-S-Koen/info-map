import { MoonIcon, SunIcon, DesktopComputerIcon } from '@heroicons/react/outline'
import { useState } from 'react'

const ThemeSelector = () => {

  let [state, setState] = useState(false)

  const setSelectedTheme = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
  }

  const setSystemTheme = () => {
    localStorage.removeItem('theme')
    setSelectedTheme()
  }

  const setLightTheme = () => {
    localStorage.theme ='light'
    setSelectedTheme()
  }

  const setDarkTheme = () => {
    localStorage.theme ='dark'
    setSelectedTheme()
  }

  return <>
    <button
      className='bg-white dark:bg-slate-800 rounded-md'
      onClick={() => setState(!state)}>{<DesktopComputerIcon className='dark:stroke-slate-500 w-6 h-6 mx-2'/>}</button>
    { state &&
      <ul className='absolute z-50 bg-white dark:bg-slate-800 rounded-md w-36 top-full mt-2 py-[6px]'>
        <li
          className='flex cursor-pointer hover:bg-slate-700 dark:text-white'
          onClick={setSystemTheme}>
          <DesktopComputerIcon className='dark:stroke-slate-500 w-6 h-6 mx-2'/>System</li>
        <li
          className='flex cursor-pointer hover:bg-slate-700 dark:text-white'
          onClick={setLightTheme}>
          <SunIcon className='dark:stroke-slate-500 w-6 h-6 mx-2'/>Light</li>
        <li
          className='flex cursor-pointer hover:bg-slate-700 dark:text-white'
          onClick={setDarkTheme}>
          <MoonIcon className='dark:stroke-slate-500 w-6 h-6 mx-2'/>Dark</li>
      </ul>
    }
  </>
}

export default ThemeSelector
