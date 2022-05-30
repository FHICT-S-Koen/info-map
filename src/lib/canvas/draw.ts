import { clearCanvas, globalToCamera } from "./utils";
import type Note from "./note";
import Vec from "./vec";

const draw = (canvas: HTMLCanvasElement, cameraPos: Vec, zoom: number, notes: Note[]) => {
	if (canvas == null) return;
	const context = canvas.getContext("2d");

	if (context) {
		const { width, height } = canvas.getBoundingClientRect();

		clearCanvas(canvas);
		drawGrid(context, cameraPos, width, height, zoom, "#64748B");

		notes.forEach((note) => drawNoteExample(context, note, cameraPos, zoom));
	}
};

const drawGrid = (
	context: CanvasRenderingContext2D,
	cameraPos: Vec,
	w: number,
	h: number,
	zoom: number,
	color: string
) => {
	const dist = zoom * 400;
	const rows = h / dist;
	const cols = w / dist;

	const offsetX =
		-cameraPos.x < 0 ? dist + ((-cameraPos.x * zoom) % dist) : (-cameraPos.x * zoom) % dist;
	const offsetY =
		cameraPos.y < 0 ? dist + ((cameraPos.y * zoom) % dist) : (cameraPos.y * zoom) % dist;

	context.beginPath();
	for (let col = 0; col < cols; col++) {
		context.moveTo(col * dist + offsetX, 0);
		context.lineTo(col * dist + offsetX, h);
	}
	for (let row = 0; row < rows; row++) {
		context.moveTo(0, row * dist + offsetY);
		context.lineTo(w, row * dist + offsetY);
	}
	context.strokeStyle = color;
	context.stroke();
};

const drawNoteExample = (
	context: CanvasRenderingContext2D,
	note: Note,
	cameraPos: Vec,
	zoom: number
) => {
	const pos = globalToCamera(new Vec(note.x, note.y), cameraPos, zoom);

	// draw text
	context.font = note.fontSize * zoom + "px ubuntu";
	for (let index = 0; index < note.text.length; index++) {
		const line = note.text[index];
		context.fillText(line, pos.x, -note.height * zoom - pos.y + 8 * (index + 1) * zoom);
	}

	// draw cursor
	context.beginPath();
	// context.moveTo(pos.x + 0.1 * zoom, -pos.y - note.height * zoom);
	// context.lineTo(pos.x + 0.1 * zoom, -pos.y - (note.height - 8) * zoom);
	const x = context.measureText(note.text[note.linePos].slice(0, note.charPos)).width;
	if (note.selectRange > 0) {
		let range = note.selectRange
		let count = 0
		while (range > 0) {
			const charRangeWidth = context.measureText(
				note.text[note.linePos+count].slice(note.charPos, note.charPos + range)
			).width;
			if (count == 0) {
				context.rect(
					pos.x + x,
					-pos.y - (note.height - 8 * (note.linePos+count)) * zoom,
					charRangeWidth,
					8 * zoom
				); 
				range -= note.text[note.linePos].length - note.charPos
			}
			else {
				context.rect(
					pos.x,
					-pos.y - (note.height - 8 * (note.linePos+count)) * zoom,
					charRangeWidth,
					8 * zoom
				);
				range -= note.text[note.linePos+count].length - note.charPos
			}
			count++
		}
	} else if (note.selectRange < 0) {// TODO: fix backward selection
		// const d = (note.charPos + note.selectRange, note.charPos - 1);

		// // console.log(note.charPos + note.selectRange, note.charPos - 1);

		// const charRangeWidth = context.measureText(note.text[note.linePos].slice(d)).width;

		// // console.log(note.text[note.linePos].slice(d));

		// context.rect(
		// 	pos.x + x,
		// 	-pos.y - (note.height - 8 * note.linePos) * zoom,
		// 	-charRangeWidth,
		// 	8 * zoom
		// );
		let range = note.selectRange
		console.log(range)

		let count = 0
		while (range < 0) {
			const charRangeWidth = context.measureText(
				note.text[note.linePos+count].slice(note.charPos, note.charPos + range)
			).width;
			if (count == 0) {
				context.rect(
					pos.x + x,
					-pos.y - (note.height - 8 * (note.linePos+count)) * zoom,
					charRangeWidth,
					8 * zoom
				); 
				range += note.text[note.linePos].length - note.charPos
			}
			else {
				context.rect(
					pos.x,
					-pos.y - (note.height - 8 * (note.linePos+count)) * zoom,
					charRangeWidth,
					8 * zoom
				);
				range += note.text[note.linePos+count].length - note.charPos
			}
			count++
			// console.log(range)
		}
	} else {
		context.moveTo(pos.x + x, -pos.y - (note.height - 8 * note.linePos) * zoom);
		context.lineTo(pos.x + x, -pos.y - (note.height - 8 * (note.linePos + 1)) * zoom);
	}
	context.strokeStyle = "#000000";
	context.stroke();

	// draw outline (selected or not)
	const longestLine = note.text.reduce((a, b) =>
		context.measureText(a).width > context.measureText(b).width ? a : b
	);
	const longestLineCanvasWidth = context.measureText(longestLine).width;
	context.beginPath();
	context.rect(
		pos.x,
		-pos.y,
		note.width * zoom > longestLineCanvasWidth ? note.width * zoom : longestLineCanvasWidth,
		-note.height * zoom
	); //INFO: -y since it's more intuitive for the user when 0,0 is bottom left
	context.strokeStyle = note.isSelected ? "#485AFF" : "#000000";
	context.stroke();
};

export default draw;
