<script lang="ts">
	import { onMount } from "svelte";
	import Vec from "./vec";
	import Note from "./note";
	import { drawGrid, drawNoteExample } from "./draw";
	import { cameraToGlobal, clearCanvas } from "./utils";

	let cameraPos = new Vec(0, 0);
	let zoom = 1;

	let canvas: HTMLCanvasElement | null;

	const resetCoords = () => {
		cameraPos = new Vec(0, 0);
		draw();
	};

	const resetZoom = () => {
		zoom = 1;
		draw();
	};

	const resizeCanvasToWindowSize = () => {
		if (canvas == null) return;
		const { width, height } = canvas.getBoundingClientRect();
		if (canvas.width !== width || canvas.height !== height) {
			canvas.width = width;
			canvas.height = height;
		}
	};

	const draw = () => {
		if (canvas == null) return;
		const context = canvas.getContext("2d");

		if (context) {
			const { width, height } = canvas.getBoundingClientRect();

			clearCanvas(canvas);
			drawGrid(context, cameraPos, width, height, zoom, "#64748B");

			const note = new Note(-25, -25, 50, 50, "test", 10);

			drawNoteExample(context, note, cameraPos, zoom, "#000000");
		}
	};

	onMount(() => {
		const handleResize = () => {
			resizeCanvasToWindowSize(), draw();
		};
		handleResize();
		window.addEventListener("resize", handleResize);
	});

	const handleMouseMove = (e: MouseEvent) => {
		if (canvas == null) return;
		const context = canvas.getContext("2d");

		if (context) {
			if (e.buttons != 1) return;
			if (e.shiftKey) return;

			// if (0 < e.clientX && e.clientX < 100 && 0 < e.clientY && e.clientY < 100) return

			cameraPos = cameraPos.add(new Vec(-e.movementX, e.movementY).div(zoom));
			draw();
		}
	};

	const handleScroll = (e: WheelEvent) => {
		if (canvas == null) return;
		const context = canvas.getContext("2d");
		if (context) {
			const factor = 1.2;
			const mousePos = new Vec(e.clientX, -(e.clientY - 78)); //TODO: make this dynamic
			const globalPos = cameraToGlobal(mousePos, cameraPos, zoom);

			if (e.deltaY > 0) {
				//TODO: implement x^-a or 1/x^a
				zoom /= factor;
				cameraPos = cameraPos.sub(globalPos).scale(factor).add(globalPos);
			} else if (e.deltaY < 0 && zoom < 160) {
				zoom *= factor;
				cameraPos = cameraPos.sub(globalPos).div(factor).add(globalPos);
			}

			draw();
		}
	};
</script>

<canvas
	id="canvas"
	class="flex-grow"
	bind:this={canvas}
	on:mousemove={handleMouseMove}
	on:wheel={handleScroll}
/>

<button
	on:click={resetCoords}
	class="absolute top-4 right-20 dark:text-slate-500 dark:bg-slate-800 font-bold x-50 shadow p-[6px] rounded-md text-slate-500"
	>x: {Math.round(cameraPos.x)}, y: {Math.round(cameraPos.y)}
</button>

<button
	on:click={resetZoom}
	class="absolute top-4 right-4 dark:text-slate-500 dark:bg-slate-800 font-bold x-50 shadow p-[6px] rounded-md text-slate-500"
	>{Math.round(zoom * 100)}%
</button>
