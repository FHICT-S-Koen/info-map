import { Component, createSignal } from 'solid-js'
import { DesktopIcon, MoonIcon, SunIcon } from './Icon'

const ThemeSelector: Component = () => {

  let [active, setActive] = createSignal(false)
  let [selected, setSetSelected] = createSignal(!!localStorage.theme)

  const setSelectedTheme = (theme?: string) => {
    setSetSelected(!!theme)
    !!theme ? localStorage.theme = theme.toLowerCase() : localStorage.removeItem('theme')

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
  }

  // const ThemeSelectorOption: FC<{icon: JSX.Element, theme?: string}> = ({icon, theme}) => {
  //   return <li
  //     class='flex cursor-pointer items-center hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white'
  //     onClick={() => setSelectedTheme(theme)}>
  //     {icon}{!theme ? 'System' : theme }
  //   </li>
  // }
  const ThemeSelectorOption: Component<{icon: any, theme?: string}> = ({icon, theme}) => {
      return <li
        class='flex cursor-pointer items-center hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white'
        onClick={() => setSelectedTheme(theme)}>
        {icon}{!theme ? 'System' : theme }
      </li>
    }

  return <button
    onClick={() => setActive(!active())}
    onBlur={() => setActive(false)}
    class={`dark:bg-slate-800 rounded-md shadow ${selected() && 'text-blue-400'}`}>
    <DesktopIcon class="w-6 h-6 m-2" />
    { active() &&
      <ul class='absolute z-50 text-black dark:bg-slate-800 rounded-md w-36 top-full shadow mt-2 py-[6px]'>
        <ThemeSelectorOption icon={<DesktopIcon class='dark:stroke-slate-500 w-6 h-6 mx-2 my-0.5'/>} />
        <ThemeSelectorOption icon={<SunIcon class='dark:stroke-slate-500 w-6 h-6 mx-2 my-0.5'/>} theme={'Light'} />
        <ThemeSelectorOption icon={<MoonIcon class='dark:stroke-slate-500 w-6 h-6 mx-2 my-0.5'/>} theme={'Dark'} />
      </ul> }
  </button>
}

export default ThemeSelector
