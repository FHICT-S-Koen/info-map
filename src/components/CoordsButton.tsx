import { useContext } from "react"
import Vec from "./canvas/vec"
import { Context } from "./Store"

function CoordsButton() {
	const [state, dispatch] = useContext(Context)
	const resetCoords = () =>
		dispatch({type: "setCameraPos", payload: new Vec(0, 0)})

	return (
		<button 
		onClick={resetCoords}
		className="absolute top-4 right-20 dark:text-slate-500 dark:bg-slate-800 font-bold x-50 shadow p-[6px] rounded-md text-slate-500"
		>x: {Math.round(state.cameraPos.x)}, y: {Math.round(state.cameraPos.y)}
		</button>
	)
}

export default CoordsButton