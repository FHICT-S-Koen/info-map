class Note {
	x: number;
	y: number;
	width: number;
	height: number;
	text: string[];
	bgColor: string;
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
		this.bgColor = Colors[Math.floor(Math.random() * 4)];
		this.linePos = 0;
		this.charPos = 0;
		this.selectRange = 0;
		this.fontSize = 10;
		this.isSelected = false;
	}
}

enum Colors {
	"#FFE370" = 0,
	"#FF6A6A",
	"#7FFF7F",
	"#7FC9FF"
}

export default Note;
