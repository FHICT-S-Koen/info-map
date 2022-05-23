import { useContext } from "react"
import { Context } from "./Store"

function ZoomButton() {
	const [state, dispatch] = useContext(Context)
	const resetZoom = () => 
		dispatch({type: "setZoom", payload: 1})

	return <button
		onClick={resetZoom}
		className="absolute top-4 right-4 dark:text-slate-500 dark:bg-slate-800 font-bold x-50 shadow p-[6px] rounded-md text-slate-500"
		>{Math.round(state.zoom * 100)}%
	</button>
}

export default ZoomButton