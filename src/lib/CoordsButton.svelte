<script lang="ts">
	import { cameraPos, last, startCoords } from "$lib/canvas/stores";
	import Vec from "./canvas/vec";

	$: x = Math.round($cameraPos.x);
	$: y = Math.round($cameraPos.x);

	const resetCoords = () => {
		cameraPos.update(() => new Vec(0, 0));
		startCoords.update(() => new Vec(0, 0));
		last.update(() => new Vec(0, 0));
	};
</script>

<button
	on:click={resetCoords}
	class="absolute top-4 right-20 dark:text-slate-500 dark:bg-slate-800 font-bold x-50 shadow p-[6px] rounded-md text-slate-500"
	>x: {x}, y: {y}
</button>
