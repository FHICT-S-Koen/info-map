<script lang="ts">
	import { cameraPos, last, startCoords, zoom } from "./stores";
	import { onMount } from "svelte";
	import Vec from "./vec";
	import draw from "./draw";
	import { cameraToGlobal } from "./utils";

	let canvas: HTMLCanvasElement;
	$: draw(canvas, $cameraPos, $zoom);

	const handleResize = () => {
		const { width, height } = canvas.getBoundingClientRect();
		if (canvas.width !== width || canvas.height !== height) {
			canvas.width = width;
			canvas.height = height;
		}
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (e.buttons != 1) return;
		if (e.shiftKey) return;

		/* Currently disabled since movementX and movementY do not work properly with tauri */
		// cameraPos.update((pos) => pos.add(new Vec(-e.movementX, e.movementY).div($zoom)));
		cameraPos.update(() =>
			new Vec(-e.clientX + $startCoords.x, e.clientY - 78 - $startCoords.y).div($zoom)
		);
	};

	const handleMouseDown = (e: MouseEvent) => {
		startCoords.update(() => new Vec(e.clientX - $last.x, e.clientY - 78 - $last.y));
	};

	const handleMouseUp = (e: MouseEvent) => {
		last.update(() => new Vec(e.clientX - $startCoords.x, e.clientY - 78 - $startCoords.y));
	}; 

	const handleScroll = (e: WheelEvent) => {
		const factor = 1.2;
		const mousePos = new Vec(e.clientX, -(e.clientY - 78)); //TODO: make this dynamic
		const globalPos = cameraToGlobal(mousePos, $cameraPos, $zoom);

		if (e.deltaY > 0) {
			//TODO: implement x^-a or 1/x^a
			zoom.update((z) => (z /= factor));
			cameraPos.update((pos) => pos.sub(globalPos).scale(factor).add(globalPos));
		} else if (e.deltaY < 0 && $zoom < 160) {
			zoom.update((z) => (z *= factor));
			cameraPos.update((pos) => pos.sub(globalPos).div(factor).add(globalPos));
		}

		// update last with new camera position
		const {x, y} = $cameraPos
		last.update(() => new Vec(-x, y).scale($zoom))
	};

	onMount(handleResize);
</script>

<svelte:window on:resize={handleResize} />

<canvas
	class="flex-grow"
	bind:this={canvas}
	on:mousemove={handleMouseMove}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
	on:wheel={handleScroll}
/>
