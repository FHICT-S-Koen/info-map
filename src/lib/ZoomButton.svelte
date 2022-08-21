<script lang="ts">
	import { zoom } from "$lib/canvas/stores";

	$: z = Math.round($zoom * 100);

	const resetZoom = () => zoom.update(() => 1);
</script>

<button
	on:click={resetZoom}
	>{z}%
	class="absolute top-2 right-12 bg-white dark:bg-[#454545] font-bold shadow p-[6px] rounded-md"
</button>
