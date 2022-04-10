import { useEffect, useRef, useState } from "react"
import { clearCanvas } from "../utils"

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const [{x, y}, _setCoords] = useState({x: 0, y: 0})
	const coordsRef = useRef({x, y})
	const setCoords = (x: number, y: number) => {
		coordsRef.current = {x, y}
		_setCoords({x, y})
	}

	const [zoom, _setZoom] = useState(100)
	const zoomRef = useRef(zoom)
	const setZoom = (z: number) => {
		zoomRef.current = z
		_setZoom(z)
	}

	const [note, _setNote] = useState({x: -25, y: -25, w: 50, h: 50, t: "test", f: 10})

	const resetCoords = () => {
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const context = canvas.getContext('2d')
			if (context) {
				setCoords(0, 0)
				draw(context)
			}
		}
	}

	const resetZoom = () => {
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const context = canvas.getContext('2d')
			if (context) {
				setZoom(100)
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
		if (canvasRef.current) {
			const canvas = canvasRef.current
			let {x, y} = coordsRef.current
			const {width, height} = canvas.getBoundingClientRect()
			const z = zoomRef.current

			x += Math.round(width * 0.5)
			y += Math.round(height * 0.5)

			clearCanvas(canvas)

			const offsetX = (-(note.w * z/100) + note.w) * 0.5
			const offsetY = (-(note.h * z/100) + note.h) * 0.5
			
			context.beginPath()
			context.rect(note.x + x + offsetX , note.y + y + offsetY, note.w * z/100, note.h * z/100)
			context.font = note.f * z/100 + 'px ubuntu'
			context.fillText("Test", note.x + x + offsetX, note.y + note.f * z/100 + y + offsetY);
			context.rect(-5 + Math.round(width * 0.5), -5 + Math.round(height * 0.5), 10, 10)
			context.stroke()
		}
	}

	

	

	useEffect(() => {
		const handleResize = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
			resizeCanvasToWindowSize(canvas)
			draw(context)
		}
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const context = canvas.getContext('2d')
			resizeCanvasToWindowSize(canvas)

			if (context) {
				draw(context)
				window.addEventListener("resize", () => handleResize(canvas, context))
				return () => window.addEventListener("resize", () => handleResize(canvas, context))
			}
		}
	}, [])

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const context = canvas.getContext('2d')
			if (context) {
				if (e.buttons != 1) return
				if (e.shiftKey) return

				// if (0 < e.clientX && e.clientX < 100 && 0 < e.clientY && e.clientY < 100) return

				setCoords(x + e.movementX, y + e.movementY) //TODO: zoom does not effect coords
				draw(context)
			}
		}
	}

	const handleScroll = (e: React.WheelEvent<HTMLCanvasElement>) => {
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const context = canvas.getContext('2d')
			if (context) {
				const {width, height} = canvas.getBoundingClientRect()
				const ox = e.clientX/width //TODO: doesn't work when using smaller window
				const oy = (e.clientY-78)/height  //TODO: make this dynamic

				if (e.deltaY > 0 && zoom > 1) {
					setZoom(Math.round(zoom - 1))

					setCoords(ox < 0.5 ? x - Math.round(zoom/2 + (ox * -zoom)) : x + Math.round(zoom/2 - (zoom - (ox * zoom))) , oy < 0.5 ? y - Math.round(zoom/2 + (oy * -zoom)) : y + Math.round(zoom/2 - (zoom - (oy * zoom)))) //TODO: refactor
				}
				else if (e.deltaY < 0) {
					setZoom(Math.round(zoom + 1))
					
					setCoords(ox < 0.5 ? x + Math.round(zoom/2 + (ox * -zoom)) : x - Math.round(zoom/2 - (zoom - (ox * zoom))) , oy < 0.5 ? y + Math.round(zoom/2 + (oy * -zoom)) : y - Math.round(zoom/2 - (zoom - (oy * zoom))))
				}

				draw(context)
			}
		}
	}

	return <><canvas
			id="canvas"
			className="flex-grow"
			ref={canvasRef}
			onWheel={handleScroll}
			onMouseMove={handleMouseMove}
			>
		</canvas>
		<button 
			onClick={resetCoords}
			className="absolute top-4 right-20 dark:text-slate-500 dark:bg-slate-800 font-bold x-50 shadow p-[6px] rounded-md text-black"
			>x: {x}, y: {y}
		</button>
		<button
			onClick={resetZoom}
			className="absolute top-4 right-4 dark:text-slate-500 dark:bg-slate-800 font-bold x-50 shadow p-[6px] rounded-md text-black"
		>{zoom}%
		</button>
	</>
}

export default Canvas
