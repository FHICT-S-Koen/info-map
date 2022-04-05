import { useContext, useEffect, useRef } from "react"
import { Context } from "./Store"

const Canvas = () => {
	const [state, dispatch] = useContext(Context)

	function drawSquares(context: CanvasRenderingContext2D) {
		const x = state.coords.x
		const y = state.coords.y
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

	function resizeCanvasToWindowSize(canvas: HTMLCanvasElement) {
		const {width, height} = canvas.getBoundingClientRect()
		if (canvas.width !== width || canvas.height !== height) {
			canvas.width = width
			canvas.height = height
		}
	}

	function handleResize(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		resizeCanvasToWindowSize(canvas)
		context.clearRect(0, 0, canvas.width, canvas.height)
		drawSquares(context)
	}

	function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
		if (e.buttons != 1) return
		const canvas = canvasRef.current
		if (!canvas) return
  		const context = canvas.getContext('2d')
		if (!context) return

		dispatch({type: 'updateCoords', payload: [e.movementX, e.movementY]})
		context.clearRect(0, 0, canvas.width, canvas.height)
		drawSquares(context)
	}

	function resetCoords() {
		const canvas = canvasRef.current
		if (!canvas) return
  		const context = canvas.getContext('2d')
		if (!context) return
		dispatch({type: 'resetCoords'})
		context.clearRect(0, 0, canvas.width, canvas.height)
		drawSquares(context)
	}

	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
  		const context = canvas.getContext('2d')
		if (!context) return

		resizeCanvasToWindowSize(canvas)
		drawSquares(context)
		
		window.addEventListener("resize", () => handleResize(context, canvas))
	}, [])

	return <><canvas
			id="canvas"
			className="flex-grow"
			ref={canvasRef}
			onMouseMove={handleMouseMove}>
		</canvas>
		<span 
			onClick={resetCoords} 
			className="absolute top-4 right-4 font-bold x-50 text-white">
				{`x: ${state.coords.x}, y: ${state.coords.y}`}
		</span>
	</>
}

export default Canvas
