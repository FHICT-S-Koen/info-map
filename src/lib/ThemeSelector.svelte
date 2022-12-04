<script lang="ts">
	import { onMount } from "svelte";

	let ls: typeof localStorage | null = null;
	let active = false;
	let selected = false;

	const setSelectedTheme = (theme?: string) => {
		if (!ls) return;
		selected = !!ls.theme;
		theme ? (ls.theme = theme.toLowerCase()) : ls.removeItem("theme");

		updateUIWithPreference(ls);
	};

	const updateUIWithPreference = (ls: Storage) => {
		if (
			ls.theme === "dark" ||
			(!("theme" in ls) && window.matchMedia("(prefers-color-scheme: dark)").matches)
		)
			document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
	};

	const previewTheme = (theme?: string) => {
		document.documentElement.classList.remove("dark");
		if (!theme) {
			if (window.matchMedia("(prefers-color-scheme: dark)").matches)
				document.documentElement.classList.add("dark");
		} else document.documentElement.classList.add(theme?.toLowerCase());
	};

	const unpreviewTheme = () => {
		if (!ls) return;
		document.documentElement.classList.remove("dark");

		updateUIWithPreference(ls);
	};

	onMount(() => {
		typeof localStorage !== `undefined` && (ls = localStorage);
		if (!ls) return;
		selected = !!ls.theme;
	});
</script>

<button
	on:click={() => (active = !active)}
	on:blur={() => (active = false)}
	class="absolute top-2 left-2 bg-white dark:bg-[#454545] rounded-md shadow {selected && 'text-blue-400'}"
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
			class="absolute z-50 bg-white text-black dark:bg-[#454545] rounded-md w-36 top-full shadow mt-2 py-[6px]"
		>
			<div
				on:click={() => setSelectedTheme()}
				on:mouseenter={() => previewTheme()}
				on:mouseleave={() => unpreviewTheme()}
				class="flex cursor-pointer items-center hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="dark:stroke-white w-6 h-6 mx-2 my-0.5"
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
				</svg>System
			</div>
			<div
				on:click={() => setSelectedTheme("Light")}
				on:mouseenter={() => previewTheme("Light")}
				on:mouseleave={() => unpreviewTheme()}
				class="flex cursor-pointer items-center hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="dark:stroke-white w-6 h-6 mx-2 my-0.5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>Light
			</div>
			<div
				on:click={() => setSelectedTheme("Dark")}
				on:mouseenter={() => previewTheme("Dark")}
				on:mouseleave={() => unpreviewTheme()}
				class="flex cursor-pointer items-center hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="dark:stroke-white w-6 h-6 mx-2 my-0.5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>Dark
			</div>
		</ul>
	{/if}
</button>
