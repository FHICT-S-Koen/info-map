<script lang="ts">
	import Vec from "$lib/canvas/vec";
	import Note from "$lib/canvas/note";

	import { cameraPos, notes, zoom } from "$lib/canvas/stores";
	import { cameraToGlobal } from "$lib/canvas/utils";

	import { onMount } from "svelte";
	import { menuIsOpen, menuPos } from "./stores";

	let menu: HTMLMenuElement;

	onMount(() => {
		menu.style.left = $menuPos.x + "px";
		menu.style.top = $menuPos.y + "px";
	});

	const handleMenuBlur = () => {
		menuIsOpen.set(false);
	};

	const handleNewNote = () => {
		const { x, y } = cameraToGlobal(new Vec($menuPos.x, -$menuPos.y + 78), $cameraPos, $zoom); // TODO: make dynamic
		notes.update((notes) => [...notes, new Note(x, y - 50)]);
	};
</script>

<!-- svelte-ignore a11y-autofocus -->
<menu
	class="absolute flex flex-col p-1 w-40 bg-white dark:bg-slate-800 rounded"
	tabindex="-1"
	autofocus
	bind:this={menu}
	on:blur={handleMenuBlur}
>
	<button on:mousedown={handleNewNote}>add note</button>
</menu>
