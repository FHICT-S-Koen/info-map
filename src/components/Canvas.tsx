import { useEffect, useRef, useState } from "react"
import { clearCanvas } from "../utils"

const Canvas = () => {
	const [{x, y}, _setCoords] = useState({x: 0, y: 0})
	const [zoom, _setZoom] = useState(1.00)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const coordsRef = useRef({x, y})
	const zoomRef = useRef(zoom)

	const setCoords = (x: number, y: number) => {
		coordsRef.current = {x, y}
		_setCoords({x, y})
	}

	const setZoom = (z: number) => {
		zoomRef.current = z
		_setZoom(z)
	}

	const drawSquares = (context: CanvasRenderingContext2D) => {
		if (canvasRef.current) {
			const canvas = canvasRef.current
			let {x, y} = coordsRef.current
			const {width, height} = canvas.getBoundingClientRect()
			// console.log(width, height)
			x -= Math.round(width * 0.5)
			y += Math.round(height * 0.5)
			// console.log(x, y)
			const z = zoomRef.current
			context.beginPath()
			context.moveTo(-25*z - x, -25*z + y)
			context.lineTo(-25*z - x, 25*z + y)
			context.lineTo(25*z - x, 25*z + y)
			context.lineTo(25*z - x, -25*z + y)
			context.lineTo(-25*z - x, -25*z + y)

			context.stroke()
		}
	}

	const resetCoords = () => {
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const context = canvas.getContext('2d')
			if (context) {
				setCoords(0, 0)
				clearCanvas(canvas)
				drawSquares(context)
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

	useEffect(() => {
		const handleResize = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
			resizeCanvasToWindowSize(canvas)
			clearCanvas(canvas)
			drawSquares(context)
		}
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const context = canvas.getContext('2d')
			resizeCanvasToWindowSize(canvas)

			if (context) {
				drawSquares(context)
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
				setCoords(Math.round(x-e.movementX/zoom), Math.round(y+e.movementY/zoom))
				clearCanvas(canvas)
				drawSquares(context)
			}
		}
	}

	const handleScroll = (e: React.WheelEvent<HTMLCanvasElement>) => {
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const context = canvas.getContext('2d')
			if (context) {
				const {width, height} = canvas.getBoundingClientRect()
				const ox = e.screenX/width //TODO: doesn't work when using smaller window
				const oy = (e.screenY-188)/height  //TODO: make this dynamic
				if (e.deltaY > 0 && zoom > 0.11) {
					setZoom(zoom - 0.05)
					setCoords(ox < 0.5 ? x + Math.round(50 + (ox * -100)) : x - Math.round(50 - (100 - (ox * 100))) , oy < 0.5 ? y - Math.round(50 + (oy * -100)) : y + Math.round(50 - (100 - (oy * 100)))) //TODO: refactor
				}  
				else if (e.deltaY < 0 && zoom < 4.9) {
					setZoom(zoom + 0.05)
					setCoords(ox < 0.5 ? x - Math.round(50 + (ox * -100)) : x + Math.round(50 - (100 - (ox * 100))) , oy < 0.5 ? y + Math.round(50 + (oy * -100)) : y - Math.round(50 - (100 - (oy * 100))))
				}
				
				resizeCanvasToWindowSize(canvas)
				clearCanvas(canvas)
				drawSquares(context)
			}
		}
	}

	return <><canvas
			id="canvas"
			className="flex-grow"
			ref={canvasRef}
			onWheel={handleScroll}
			onMouseMove={handleMouseMove}>
		</canvas>
		<span /*TODO: fix location, styling and light theme*/
			onClick={resetCoords} 
			className="absolute top-4 right-4 font-bold x-50 text-white">
			{`x: ${x}, y: ${y}, z: ${Math.round(zoom*100)}%`}
		</span>
	</>
}

export default Canvas
