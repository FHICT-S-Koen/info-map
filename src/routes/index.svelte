<script lang="ts">
	import ZoomButton from "$lib/ZoomButton.svelte";
	import CoordsButton from "$lib/CoordsButton.svelte";
	import Canvas from "$lib/canvas/Canvas.svelte";

	import { invoke } from '@tauri-apps/api/tauri'
	import { notes } from "$lib/canvas/stores";
	import { onMount } from "svelte";

	const handleWindowKeyDown = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key == "s")
			invoke("save_notes", { notes: JSON.stringify($notes) })
	}

	onMount(() =>
		invoke("get_notes", { path: "" }).then(res => {
    		notes.set(JSON.parse(res as string))
  		})
	)
</script>

<svelte:window on:keydown={handleWindowKeyDown} />

<Canvas />
<CoordsButton />
<ZoomButton />
