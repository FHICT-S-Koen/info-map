<script lang="ts">
	import Canvas from "$lib/canvas/Canvas.svelte";

	import { invoke } from '@tauri-apps/api/tauri'
	import { notes } from "$lib/canvas/stores";
	import { onMount } from "svelte";

	let ls: typeof localStorage | null = null;

	const handleWindowKeyDown = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key == "s")
			invoke("save_notes", { notes: JSON.stringify($notes) })
	}

	onMount(() => {
		typeof localStorage !== `undefined` && (ls = localStorage);
		if (!ls) return;

		invoke("get_notes", { path: ls.getItem("path") }).then(res => {
    		notes.set(JSON.parse(res as string))
  		})
	})
</script>

<svelte:window on:keydown={handleWindowKeyDown} />

<Canvas />
