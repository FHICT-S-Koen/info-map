import { useEffect, useRef, useState } from "react"
import { clearCanvas } from "../utils"

const Canvas = () => {
	const [{x, y}, _setCoords] = useState({x: 0, y: 0})
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const coordsRef = useRef({x, y})

	const setCoords = (x: number, y: number) => {
		coordsRef.current = {x, y}
		_setCoords({x: x, y: y})
	}

	const drawSquares = (context: CanvasRenderingContext2D) => {
		const {x, y} = coordsRef.current
		context.beginPath()
		context.moveTo(50 + x, 50 + y)
		context.lineTo(50 + x, 100 + y)
		context.lineTo(100 + x, 100 + y)
		context.lineTo(100 + x, 50 + y)
		context.lineTo(50 + x, 50 + y)
		context.moveTo(120 + x, 50 + y)
		context.lineTo(120 + x, 100 + y)
		context.lineTo(170 + x, 100 + y)
		context.lineTo(170 + x, 50 + y)
		context.lineTo(120 + x, 50 + y)
		context.stroke()
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
				setCoords(x+e.movementX, y+e.movementY)
				clearCanvas(canvas)
				drawSquares(context)
			}
		}
	}

	return <><canvas
			id="canvas"
			className="flex-grow"
			ref={canvasRef}
			onMouseMove={handleMouseMove}>
		</canvas>
		<span /*TODO: fix location, styling and light theme*/
			onClick={resetCoords} 
			className="absolute top-4 right-4 font-bold x-50 text-white">
			{`x: ${x}, y: ${y}`}
		</span>
	</>
}

export default Canvas
