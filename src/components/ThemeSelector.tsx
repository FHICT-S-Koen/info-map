import { MoonIcon, SunIcon, DesktopComputerIcon } from '@heroicons/react/outline'
import { useState, FC } from 'react'

const ThemeSelector = () => {

  let [active, setActive] = useState(false)
  let [selected, setSetSelected] = useState(!!localStorage.theme)

  const setSelectedTheme = (theme?: string) => {
    setSetSelected(!!theme)
    !!theme ? localStorage.theme = theme.toLowerCase() : localStorage.removeItem('theme')

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
  }

  const ThemeSelectorOption: FC<{icon: JSX.Element, theme?: string}> = ({icon, theme}) => {
    return <li
      className='flex cursor-pointer items-center hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white'
      onClick={() => setSelectedTheme(theme)}>
      {icon}{!theme ? 'System' : theme }
    </li>
  }

  return <button
    onClick={() => setActive(!active)}
    onBlur={() => setActive(false)}
    className={`dark:bg-slate-800 rounded-md shadow ${selected && 'text-blue-400'}`}>
    <DesktopComputerIcon className='w-6 h-6 m-2'/>
    { active &&
      <ul className='absolute z-50 text-black dark:bg-slate-800 rounded-md w-36 top-full shadow mt-2 py-[6px]'>
        <ThemeSelectorOption icon={<DesktopComputerIcon className='dark:stroke-slate-500 w-6 h-6 mx-2 my-0.5'/>} />
        <ThemeSelectorOption icon={<SunIcon className='dark:stroke-slate-500 w-6 h-6 mx-2 my-0.5'/>} theme={'Light'} />
        <ThemeSelectorOption icon={<MoonIcon className='dark:stroke-slate-500 w-6 h-6 mx-2 my-0.5'/>} theme={'Dark'} />
      </ul> }
  </button>
}

export default ThemeSelector
