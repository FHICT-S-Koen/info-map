const drawGrid = (context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, zoom: number, color: string) => {
	const dist = zoom
	const rows = h / dist
	const cols = w / dist

	const offsetX = x < 0 ? dist + x % dist : x % dist
	const offsetY = y < 0 ? dist + y % dist : y % dist

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

const drawNoteExample = (context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, zoom: number, color: string) => {
	const note = {x: -25, y: -25, w: 50, h: 50, t: "test", f: 10}

	const offsetX = (-(note.w * zoom/100) + note.w) * 0.5
	const offsetY = (-(note.h * zoom/100) + note.h) * 0.5

	context.beginPath()
	context.rect(note.x + x + offsetX , note.y + y + offsetY, note.w * zoom/100, note.h * zoom/100)
	context.font = note.f * zoom/100 + 'px ubuntu'
	context.fillText("Test", note.x + x + offsetX, note.y + note.f * zoom/100 + y + offsetY);
	context.strokeStyle = color
	context.stroke()
}

export { drawGrid, drawNoteExample }