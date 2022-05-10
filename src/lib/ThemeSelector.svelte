<script lang="ts">

	let active = false;
	// let selected = writable(!!localStorage.theme);

	const setActive = (v: boolean) => {
		active = v;
	};

	// const setSelectedTheme = (theme?: string) => {
	// 	selected = writable(!!theme);
	// 	!!theme ? (localStorage.theme = theme.toLowerCase()) : writable(localStorage.removeItem("theme"));
		
	// 	if (
	// 		localStorage.theme === "dark" ||
	// 		(!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
	// 	)
	// 		document.documentElement.classList.add("dark");
	// 	else document.documentElement.classList.remove("dark");
	// };

	//   const ThemeSelectorOption: Component<{icon: any, theme?: string}> = ({icon, theme}) => {
	//       return <li
	//         class='flex cursor-pointer items-center hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white'
	//         onClick={() => setSelectedTheme(theme)}>
	//         {icon}{!theme ? 'System' : theme }
	//       </li>
	//     }
</script>

<button
	on:click={() => setActive(!active)}
	on:blur={() => setActive(false)}
	class="dark:bg-slate-800 rounded-md shadow {true && "text-blue-400"}"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="w-6 h-6 m-2"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
		/>
	</svg>
	{#if active}
		<ul
			class="absolute z-50 text-black dark:bg-slate-800 rounded-md w-36 top-full shadow mt-2 py-[6px]"
		>
			<!-- <ThemeSelectorOption icon={<DesktopComputerIcon className='dark:stroke-slate-500 w-6 h-6 mx-2 my-0.5'/>} />
        <ThemeSelectorOption icon={<SunIcon className='dark:stroke-slate-500 w-6 h-6 mx-2 my-0.5'/>} theme={'Light'} />
        <ThemeSelectorOption icon={<MoonIcon className='dark:stroke-slate-500 w-6 h-6 mx-2 my-0.5'/>} theme={'Dark'} /> -->
		</ul>
	{/if}
</button>
