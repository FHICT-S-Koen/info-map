import { useContext, useEffect, useRef } from "react"
import { Context } from "../Store"
import draw from "./draw"
import Vec from "./vec"
import { cameraToGlobal } from "./utils"

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [state, dispatch] = useContext(Context)

	const resizeCanvasToWindowSize = (canvas: HTMLCanvasElement) => {
		const {width, height} = canvas.getBoundingClientRect()
		if (canvas.width !== width || canvas.height !== height) {
			canvas.width = width
			canvas.height = height
		}
	}

	useEffect(() => {
		const handleResize = (canvas: HTMLCanvasElement) => {
			resizeCanvasToWindowSize(canvas)
			draw(canvas, state.cameraPos, state.zoom)
		}
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const context = canvas.getContext('2d')
			resizeCanvasToWindowSize(canvas)

			if (context) {
				draw(canvas, state.cameraPos, state.zoom)
				window.addEventListener("resize", () => handleResize(canvas))
				return () => window.addEventListener("resize", () => handleResize(canvas))
			}
		}
	}, [state.cameraPos, state.zoom])

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (e.buttons != 1) return
		if (e.shiftKey) return

		// if (0 < e.clientX && e.clientX < 100 && 0 < e.clientY && e.clientY < 100) return
		dispatch({type: "setCameraPos", payload: state.cameraPos.add(new Vec(-e.movementX, e.movementY).div(state.zoom))})
	}

	const handleScroll = (e: React.WheelEvent<HTMLCanvasElement>) => {
		const factor = 1.2
		const mousePos = new Vec(e.clientX, -(e.clientY-78)) //TODO: make this dynamic
		const globalPos = cameraToGlobal(mousePos, state.cameraPos, state.zoom)

		if (e.deltaY > 0) { //TODO: implement x^-a or 1/x^a
			dispatch({type: "setZoom", payload: state.zoom / factor})
			dispatch({type: "setCameraPos", payload: state.cameraPos.sub(globalPos).scale(factor).add(globalPos)})
		}
		else if (e.deltaY < 0  && state.zoom < 160) {
			dispatch({type: "setZoom", payload: state.zoom * factor})
			dispatch({type: "setCameraPos", payload: state.cameraPos.sub(globalPos).div(factor).add(globalPos)})
		}
	}

	return <canvas
		id="canvas"
		className="flex-grow"
		ref={canvasRef}
		onWheel={handleScroll}
		onMouseMove={handleMouseMove}
		>
	</canvas>
}

export default Canvas
