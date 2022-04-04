import { useEffect, useState } from "react"

const Canvas = () => {

	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
	let coords = {
		x: 0,
		y: 0
	}
	const [coordsState, setCoords] = useState(coords)
	

	function drawSquares(context: CanvasRenderingContext2D) {
		context.beginPath()
		context.moveTo(50 + coords.x, 50 + coords.y)
		context.lineTo(50 + coords.x, 100 + coords.y)
		context.lineTo(100 + coords.x, 100 + coords.y)
		context.lineTo(100 + coords.x, 50 + coords.y)
		context.lineTo(50 + coords.x, 50 + coords.y)
		context.moveTo(120 + coords.x, 50 + coords.y)
		context.lineTo(120 + coords.x, 100 + coords.y)
		context.lineTo(170 + coords.x, 100 + coords.y)
		context.lineTo(170 + coords.x, 50 + coords.y)
		context.lineTo(120 + coords.x, 50 + coords.y)
		context.stroke()
	}

	useEffect(() => {
		const canvas = document.getElementById("canvas") as HTMLCanvasElement
		const context = canvas.getContext("2d")

		window.addEventListener("resize", e => {
			setDimensions({ width: canvas.clientWidth, height: canvas.clientHeight })
			context?.clearRect(0, 0, canvas.width, canvas.height)
			context ? drawSquares(context) : undefined
		})
		canvas.addEventListener("mousemove", e => {
			if (e.buttons != 1) return
			coords.x += e.movementX
			coords.y += e.movementY
			setCoords(coords)
			context?.clearRect(0, 0, canvas.width, canvas.height)
			context ? drawSquares(context) : undefined
		})
	}, [])

	return <><canvas
		id="canvas"
		className="flex-grow"
		width={dimensions.width}
		height={dimensions.height}>
	</canvas>
		<span className="absolute top-4 right-4 font-bold x-50 text-white">{`x: ${coordsState.x}, y: ${coordsState.y}`}</span>
	</>
}

export default Canvas
