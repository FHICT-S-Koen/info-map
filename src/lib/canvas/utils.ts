import Vec from "./vec";

const clearCanvas = (canvas: HTMLCanvasElement) => {
	canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
};

const globalToCamera = (coords: Vec, camera: Vec, zoom: number) => {
	//TODO: add centering
	return coords.sub(camera).scale(zoom);
};

const cameraToGlobal = (coords: Vec, camera: Vec, zoom: number) => {
	//TODO: add centering
	return coords.div(zoom).add(camera);
};

export { clearCanvas, globalToCamera, cameraToGlobal };
