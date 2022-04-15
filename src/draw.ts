import { globalToCamera } from "./utils"
import Note from "./note"
import Vec from "./vec"

const drawGrid = (context: CanvasRenderingContext2D, cameraPos: Vec, w: number, h: number, zoom: number, color: string) => {
	const dist = zoom * 400
	const rows = h / dist
	const cols = w / dist

	const offsetX = -cameraPos.x < 0 ? dist + -cameraPos.x * zoom % dist : -cameraPos.x * zoom % dist
	const offsetY = cameraPos.y < 0 ? dist + cameraPos.y * zoom % dist : cameraPos.y * zoom % dist

	context.beginPath()
	for (let col = 0; col < cols; col++) {
		context.moveTo(col * dist + offsetX, 0)
		context.lineTo(col * dist + offsetX, h)
	}
	for (let row = 0; row < rows; row++) {
		context.moveTo(0, row * dist + offsetY)
		context.lineTo(w, row * dist + offsetY)
	}
	context.strokeStyle = color
	context.stroke()
}

const drawNoteExample = (context: CanvasRenderingContext2D, note: Note, cameraPos: Vec, zoom: number, color: string) => {
	const pos = globalToCamera(new Vec(note.x, note.y), cameraPos, zoom)

	context.beginPath()
	context.rect(pos.x, - pos.y, note.width * zoom, -note.height * zoom) //TODO: -y since it's more intuitive for the user when 0,0 is bottom left
	context.font = note.fontSize * zoom + 'px ubuntu'
	context.fillText(note.text, pos.x, -note.height* zoom-pos.y+8*zoom)
	context.strokeStyle = color
	context.stroke()
}

export { drawGrid, drawNoteExample }