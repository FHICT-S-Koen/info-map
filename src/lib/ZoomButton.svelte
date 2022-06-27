<script lang="ts">
	import { zoom } from "$lib/canvas/stores";

	$: z = Math.round($zoom * 100);

	const resetZoom = () => zoom.update(() => 1);
</script>

<button
	on:click={resetZoom}
	class="dark:text-slate-500 dark:bg-slate-800 font-bold shadow p-[6px] rounded-md text-slate-500"
	>{z}%
</button>
