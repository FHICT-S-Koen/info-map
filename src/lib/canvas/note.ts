class Note {
	x: number;
	y: number;
	width: number;
	height: number;
	text: string[];
	linePos: number;
	charPos: number;
	selectRange: number;
	fontSize: number;
	isSelected: boolean;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 50;
		this.text = [""];
		this.linePos = 0;
		this.charPos = 0;
		this.selectRange = 0;
		this.fontSize = 10;
		this.isSelected = false;
	}
}

export default Note;
