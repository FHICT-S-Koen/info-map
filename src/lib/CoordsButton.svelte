<script lang="ts">
	import { cameraPos, last, startCoords } from "$lib/canvas/stores";
	import Vec from "./common/vec";

	$: x = Math.round($cameraPos.x);
	$: y = Math.round($cameraPos.y);

	const resetCoords = () => {
		cameraPos.update(() => new Vec(0, 0));
		startCoords.update(() => new Vec(0, 0));
		last.update(() => new Vec(0, 0));
	};
</script>

<button
	on:click={resetCoords}
	class="absolute top-2 right-28 bg-white dark:bg-[#454545] font-bold shadow p-[6px] rounded-md"
	>x: {x}, y: {y}
</button>
