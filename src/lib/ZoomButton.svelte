<script lang="ts">
	import { zoom } from "$lib/canvas/stores";

	$: z = Math.round($zoom * 100);

	const resetZoom = () => zoom.update(() => 1);
</script>

<button
	on:click={resetZoom}
	class="absolute top-4 right-4 dark:text-slate-500 dark:bg-slate-800 font-bold x-50 shadow p-[6px] rounded-md text-slate-500"
	>{z}%
</button>
