<script lang="ts">
	import { onMount } from "svelte";
	let ls: typeof localStorage | null = null;
	let input: HTMLInputElement;
	let dialogOpen = false;
	let showSource = false;
	let value = "";

	const handleOpen = () => {
		dialogOpen = !dialogOpen;
		if (!ls) return;
		const path = ls.getItem("path");
		if (path) value = path;
	};

	const handleShow = () => {
		showSource = !showSource;
		input.type = showSource ? (input.type = "text") : (input.type = "password");
	};

	const handleBlur = () => {
		dialogOpen = !dialogOpen;
	};

	const handleSetSource = () => {
		if (!ls) return;
		ls.setItem("path", input.value);
	};

	onMount(() => {
		typeof localStorage !== `undefined` && (ls = localStorage);
	});
</script>

<button
	on:click={handleOpen}
	class="absolute top-2 right-2 bg-white dark:bg-[#454545] font-bold shadow p-[6px] rounded-md"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
		/>
	</svg>
</button>

{#if dialogOpen}
	<div
		on:blur={handleBlur}
		class="absolute flex flex-col bg-slate-100 dark:text-slate-500 w-96 h-56 dark:bg-slate-800 font-bold shadow p-[6px] rounded-md text-slate-500 top-[50vh] left-1/2 -translate-x-1/2"
	>
		<div class="flex flex-row justify-between">
			<div class="flex flex-row gap-1">
				<input
					bind:this={input}
					{value}
					class="dark:text-slate-500 dark:bg-slate-700 font-bold shadow p-[6px] rounded-md text-slate-500"
					type="password"
				/>
				<button
					class="dark:text-slate-500 dark:bg-slate-700 font-bold shadow p-[6px] rounded-md text-slate-500"
					on:click={handleShow}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
						<path
							fill-rule="evenodd"
							d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
			<button
				on:click={handleSetSource}
				class="dark:text-slate-500 dark:bg-slate-700 font-bold shadow p-[6px] rounded-md text-slate-500"
				>set source</button
			>
		</div>
	</div>
{/if}
