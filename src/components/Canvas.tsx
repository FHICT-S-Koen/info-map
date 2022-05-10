import { drawGrid, drawNoteExample } from "../draw"
import { cameraToGlobal, clearCanvas } from "../utils"
import Note from "../note"
import Vec from "../vec"
import { Component, createSignal, onMount } from 'solid-js'

const Canvas: Component = () => {
	let canvas: HTMLCanvasElement

	const [cameraPos, setCameraPos] = createSignal(new Vec(0, 0))
	const [zoom, setZoom] = createSignal(1)


	const resetCoords = () => {
		if (canvas) {
			const context = canvas.getContext('2d')
			if (context) {
				setCameraPos(new Vec(0, 0))
				draw(context)
			}
		}
	}

	const resetZoom = () => {
		if (canvas) {
			const context = canvas.getContext('2d')
			if (context) {
				setZoom(1)
				draw(context)
			}
		}
	}

	const resizeCanvasToWindowSize = (canvas: HTMLCanvasElement) => {
		const {width, height} = canvas.getBoundingClientRect()
		if (canvas.width !== width || canvas.height !== height) {
			canvas.width = width
			canvas.height = height
		}
	}

	const draw = (context: CanvasRenderingContext2D) => {
		if (canvas) {
			const {width, height} = canvas.getBoundingClientRect()
			
			clearCanvas(canvas)
			drawGrid(context, cameraPos(), width, height, zoom(), '#64748B')

			const note = new Note(-25, -25, 50, 50, "test", 10)

			drawNoteExample(context, note, cameraPos(), zoom(), '#000000')
		}
	}
	

	onMount(() => {
		const handleResize = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
			resizeCanvasToWindowSize(canvas)
			draw(context)
		}
		if (canvas) {
			const context = canvas.getContext('2d')
			resizeCanvasToWindowSize(canvas)

			if (context) {
				draw(context)
				window.addEventListener("resize", () => handleResize(canvas, context))
			}
		}
	})

	const handleMouseMove = (e: MouseEvent & {
		currentTarget: HTMLCanvasElement;
		target: Element;
	}) => {
		if (canvas) {
			const context = canvas.getContext('2d')
			if (context) {
				if (e.buttons != 1) return
				if (e.shiftKey) return

				// if (0 < e.clientX && e.clientX < 100 && 0 < e.clientY && e.clientY < 100) return

				setCameraPos(cameraPos().add(new Vec(-e.movementX, e.movementY).div(zoom())))
				draw(context)
			}
		}
	}

	const handleScroll = (e: WheelEvent & {
		currentTarget: HTMLCanvasElement;
		target: Element;
	}) => {
		if (canvas) {
			const context = canvas.getContext('2d')
			if (context) {
				const factor = 1.2
				const mousePos = new Vec(e.clientX, -(e.clientY-78)) //TODO: make this dynamic
				const globalPos = cameraToGlobal(mousePos, cameraPos(), zoom())

				if (e.deltaY > 0) { //TODO: implement x^-a or 1/x^a
					setZoom(zoom() / factor)
					setCameraPos(cameraPos().sub(globalPos).scale(factor).add(globalPos))
				}
				else if (e.deltaY < 0  && zoom() < 160) {
					setZoom(zoom() * factor)
					setCameraPos(cameraPos().sub(globalPos).div(factor).add(globalPos))
				}

				draw(context)
			}
		}
	}

	return <><canvas
			id="canvas"
			class="flex-grow"
			ref={canvas}
			onWheel={handleScroll}
			onMouseMove={handleMouseMove}
			>
		</canvas>
		<button 
			onClick={resetCoords}
			class="absolute top-4 right-20 dark:text-slate-500 dark:bg-slate-800 font-bold x-50 shadow p-[6px] rounded-md text-slate-500"
			>x: {Math.round(cameraPos().x)}, y: {Math.round(cameraPos().y)}
		</button>
		<button
			onClick={resetZoom}
			class="absolute top-4 right-4 dark:text-slate-500 dark:bg-slate-800 font-bold x-50 shadow p-[6px] rounded-md text-slate-500"
			>{Math.round(zoom() * 100)}%
		</button>
	</>
}

export default Canvas
