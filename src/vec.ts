class Vec {
	public readonly x: number 
	public readonly y: number

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	add(other: Vec): Vec {
		return new Vec(this.x + other.x, this.y + other.y)
	}

	sub(other: Vec): Vec {
		return new Vec(this.x - other.x, this.y - other.y)
	}

	scale(scalar: number): Vec {
		return new Vec(this.x * scalar, this.y * scalar)
	}

	div(scalar: number): Vec {
		return new Vec(this.x / scalar, this.y / scalar)
	}
}

export default Vec