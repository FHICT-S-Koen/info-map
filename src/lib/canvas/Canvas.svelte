<script lang="ts">
	import { cameraPos, last, notes, startCoords, zoom } from "./stores";
	import { onMount } from "svelte";
	import Vec from "./vec";
	import draw from "./draw";
	import { cameraToGlobal, globalToCamera } from "./utils";
	import Menu from "$lib/menu/Menu.svelte";
	import { menuIsOpen, menuPos } from "$lib/menu/stores";

	let noteSelected = false;
	let resizing = false;
	let canvas: HTMLCanvasElement;
	$: draw(canvas, $cameraPos, $zoom, $notes);

	const handleResize = () => {
		const { width, height } = canvas.getBoundingClientRect();
		if (canvas.width !== width || canvas.height !== height) {
			canvas.width = width;
			canvas.height = height;
		}
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (e.shiftKey && e.buttons == 1) {
			notes.update((notes) =>
				notes.map((note) => {
					if (note.isSelected) {
						const mousePos = new Vec(e.clientX, -(e.clientY - canvas.offsetTop));
						const globalMousePos = cameraToGlobal(mousePos, $cameraPos, $zoom);
						note.x = globalMousePos.x;
						note.y = globalMousePos.y;
					}
					return note;
				})
			);
		} else if (e.buttons == 1 && noteSelected) {
			const mousePos = new Vec(e.clientX, -(e.clientY - canvas.offsetTop));
			const globalMousePos = cameraToGlobal(mousePos, $cameraPos, $zoom);

			$notes.find((note, id) => {
				if (
					globalMousePos.x > note.x &&
					globalMousePos.y > note.y &&
					globalMousePos.x < note.x + note.width &&
					globalMousePos.y < note.y + note.height &&
					note.isSelected
				) {
					const pos = globalToCamera(new Vec(note.x, note.y), $cameraPos, $zoom);
					const mousePos = new Vec(e.clientX, -(e.clientY - canvas.offsetTop));

					const context = canvas.getContext("2d");
					if (!context) return;

					let currentLine = note.text.findIndex((_, i) => {
						if (-pos.y - (note.height - 8 * i) * $zoom > -mousePos.y) {
							return i;
						} else if (
							-pos.y - (note.height - 8 * (i - 1)) * $zoom < -mousePos.y &&
							-pos.y - (note.height - 8 * i) * $zoom > -mousePos.y
						) {
							return i;
						}
					});
					if (currentLine == -1) currentLine = note.text.length;
					currentLine -= 1;
					let s = pos.x;
					let count = 0;
					for (const c of note.text[currentLine]) {
						count += 1;
						const d = s + context.measureText(c).width / 2;
						if (d > mousePos.x) {
							count -= 1;
							break;
						}
						s += context.measureText(c).width;
					}
					notes.update((notes) => {
						if (note.linePos == currentLine) {
							notes[id].selectRange = count - note.charPos;
						} else if (note.linePos < currentLine) {
							let range = note.text[note.linePos].length - note.charPos;
							for (let index = 0; index < currentLine - note.linePos - 1; index++) {
								range += note.text[note.linePos + index + 1].length;
							}
							notes[id].selectRange = range + count;
						} else {
							let range = -note.charPos;
							for (let index = 0; index < note.linePos - currentLine - 1; index++) {
								range -= note.text[note.linePos + index - 1].length;
							}
							notes[id].selectRange = range + count - note.text[currentLine].length;
						}
						return notes;
					});
				}
			});
		} else {
			const mousePos = new Vec(e.clientX, -(e.clientY - canvas.offsetTop));
			const globalMousePos = cameraToGlobal(mousePos, $cameraPos, $zoom);
			$notes.forEach((note, i) => {
				notes.update((notes) => {
					if (
						globalMousePos.x > note.x + 2 &&
						globalMousePos.x < note.x + note.width - 2 &&
						globalMousePos.y > note.y + note.height + 2 &&
						globalMousePos.y < note.y + note.height + 6
					) {
						canvas.style.cursor = "n-resize";
						if (e.buttons == 1) {
							resizing = true
							notes[i].height = globalMousePos.y - note.y - 4;
						}
					} else if (
						globalMousePos.x > note.x + 2 &&
						globalMousePos.x < note.x + note.width - 2 &&
						globalMousePos.y > note.y - 6 &&
						globalMousePos.y < note.y - 2
					) {
						canvas.style.cursor = "s-resize";
						if (e.buttons == 1) {
							resizing = true
							notes[i].height = note.height - globalMousePos.y + note.y - 4;
							notes[i].y = globalMousePos.y + 4;
						}
					} else if (
						globalMousePos.y > note.y + 2 &&
						globalMousePos.y < note.y + note.height - 2 &&
						globalMousePos.x > note.x - 6 &&
						globalMousePos.x < note.x - 2
					) {
						canvas.style.cursor = "w-resize";
						if (e.buttons == 1) {
							resizing = true
							notes[i].width = note.width - globalMousePos.x + note.x - 4;
							notes[i].x = globalMousePos.x + 4;
						}
					} else if (
						globalMousePos.y > note.y + 2 &&
						globalMousePos.y < note.y + note.height - 2 &&
						globalMousePos.x > note.x + note.width + 2 &&
						globalMousePos.x < note.x + note.width + 6
					) {
						canvas.style.cursor = "e-resize";
						if (e.buttons == 1) {
							resizing = true
							notes[i].width = globalMousePos.x - note.x - 4;
						}
					} else if (
						globalMousePos.y < note.y + note.height + 6 &&
						globalMousePos.y > note.y + note.height + 2 &&
						globalMousePos.x < note.x + note.width + 6 &&
						globalMousePos.x > note.x + note.width + 2
					) {
						canvas.style.cursor = "ne-resize";
						if (e.buttons == 1) {
							resizing = true
							notes[i].width = globalMousePos.x - note.x - 4;
							notes[i].height = globalMousePos.y - note.y - 4;
						}
					} else if (
						globalMousePos.y < note.y + note.height + 6 &&
						globalMousePos.y > note.y + note.height + 2 &&
						globalMousePos.x < note.x - 2 &&
						globalMousePos.x > note.x - 6
					) {
						canvas.style.cursor = "nw-resize";
						if (e.buttons == 1) {
							resizing = true
							notes[i].height = globalMousePos.y - note.y - 4;
							notes[i].width = note.width - globalMousePos.x + note.x - 4;
							notes[i].x = globalMousePos.x + 4;
						}
					} else if (
						globalMousePos.y < note.y - 2 &&
						globalMousePos.y > note.y - 6 &&
						globalMousePos.x < note.x + note.width + 6 &&
						globalMousePos.x > note.x + note.width + 2
					) {
						canvas.style.cursor = "se-resize";
						if (e.buttons == 1) {
							resizing = true
							notes[i].height = note.height - globalMousePos.y + note.y - 4;
							notes[i].y = globalMousePos.y + 4;
							notes[i].width = globalMousePos.x - note.x - 4;
						}
					} else if (
						globalMousePos.y < note.y - 2 &&
						globalMousePos.y > note.y - 6 &&
						globalMousePos.x < note.x - 2 &&
						globalMousePos.x > note.x - 6
					) {
						canvas.style.cursor = "sw-resize";
						if (e.buttons == 1) {
							resizing = true
							notes[i].height = note.height - globalMousePos.y + note.y - 4;
							notes[i].y = globalMousePos.y + 4;
							notes[i].width = note.width - globalMousePos.x + note.x - 4;
							notes[i].x = globalMousePos.x + 4;
						}
					} else if (!resizing) {
						canvas.style.cursor = "pointer";
						/* Currently disabled since movementX and movementY do not work properly with tauri */
						// cameraPos.update((pos) => pos.add(new Vec(-e.movementX, e.movementY).div($zoom)));
						if (e.buttons == 1) {
							cameraPos.update(pos => {
								// const d =new Vec(-e.clientX + $startCoords.x, e.clientY - $startCoords.y).div($zoom).sub(pos)
								// console.log(d.x, d.y, "---", e.movementX, e.movementY)
								return new Vec(-e.clientX + $startCoords.x, e.clientY - $startCoords.y).div($zoom)
								}
							);
							last.update(() => new Vec(e.clientX - $startCoords.x, e.clientY - $startCoords.y));
						}
					}
					return notes;
				});
			});
		}
	};

	const handleMouseDown = (e: MouseEvent) => {
		const mousePos = new Vec(e.clientX, -(e.clientY - canvas.offsetTop));
		const globalMousePos = cameraToGlobal(mousePos, $cameraPos, $zoom);

		let count = 0;
		if (noteSelected) {
			$notes.find((note, id) => {
				if (
					globalMousePos.x > note.x &&
					globalMousePos.y > note.y &&
					globalMousePos.x < note.x + note.width &&
					globalMousePos.y < note.y + note.height &&
					note.isSelected
				) {
					const pos = globalToCamera(new Vec(note.x, note.y), $cameraPos, $zoom);
					const mousePos = new Vec(e.clientX, -(e.clientY - canvas.offsetTop));

					const context = canvas.getContext("2d");
					if (!context) return;

					let clickedLine = note.text.findIndex((_, i) => {
						if (-pos.y - (note.height - 8 * i) * $zoom > -mousePos.y) {
							return i;
						} else if (
							-pos.y - (note.height - 8 * (i - 1)) * $zoom < -mousePos.y &&
							-pos.y - (note.height - 8 * i) * $zoom > -mousePos.y
						) {
							return i;
						}
					});
					if (clickedLine == -1) clickedLine = note.text.length;
					clickedLine -= 1;
					let s = pos.x;
					let count = 0;
					for (const c of note.text[clickedLine]) {
						count += 1;
						const d = s + context.measureText(c).width / 2;
						if (d > mousePos.x) {
							count -= 1;
							break;
						}
						s += context.measureText(c).width;
					}
					notes.update((notes) => {
						notes[id].linePos = clickedLine;
						notes[id].charPos = count;
						notes[id].selectRange = 0;
						return notes;
					});
				} else if (!e.shiftKey) {
					$notes.forEach((note, id) => {
						if (
							globalMousePos.x > note.x &&
							globalMousePos.y > note.y &&
							globalMousePos.x < note.x + note.width &&
							globalMousePos.y < note.y + note.height
						) {
							notes.update((notes) => {
								notes[id].isSelected = true;
								count += 1;
								return notes;
							});
						} else {
							notes.update((notes) => {
								notes[id].isSelected = false;
								return notes;
							});
						}
					});
					noteSelected = count >= 1;
				}
			});
		} else if (!e.shiftKey) {
			$notes.forEach((note, id) => {
				if (
					globalMousePos.x > note.x &&
					globalMousePos.y > note.y &&
					globalMousePos.x < note.x + note.width &&
					globalMousePos.y < note.y + note.height
				) {
					notes.update((notes) => {
						notes[id].isSelected = true;
						count += 1;
						return notes;
					});
				} else {
					notes.update((notes) => {
						notes[id].isSelected = false;
						return notes;
					});
				}
			});
			noteSelected = count >= 1;
		}
		startCoords.update(() => new Vec(e.clientX - $last.x, e.clientY - $last.y));
	};

	const handleMouseUp = (e: MouseEvent) => {
		resizing = false
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		$notes.forEach((note, id) => {
			if (note.isSelected) {
				notes.update((notes) => {
					if (e.ctrlKey && e.key == "Backspace") {
						// TODO: contains bug
						const words = notes[id].text[note.linePos].split(" ");
						notes[id].text[note.linePos] = notes[id].text[note.linePos].slice(
							0,
							-words[words.length - 1].length - 1
						);
						note.charPos -= words[words.length - 1].length + 1;
					} else if (e.ctrlKey && e.key == "Delete") {
						notes.splice(id, 1);
						noteSelected = false;
					} else if (e.altKey && e.key == "ArrowUp" && notes[id].text.length > 1 && notes[id].linePos > 0) {
						[notes[id].text[notes[id].linePos-1], notes[id].text[notes[id].linePos]] = [notes[id].text[notes[id].linePos], notes[id].text[notes[id].linePos-1]];
						note.linePos -= 1;
					} else if (e.altKey && e.key == "ArrowDown" && notes[id].linePos+1 < notes[id].text.length) {
						[notes[id].text[notes[id].linePos+1], notes[id].text[notes[id].linePos]] = [notes[id].text[notes[id].linePos], notes[id].text[notes[id].linePos+1]];
						note.linePos += 1;
					} else
						switch (e.key) {
							case "Enter":
								notes[id].linePos += 1;
								notes[id].text.push("");
								notes[id].charPos = 0;
								break;
							case "Control":
								break;
							case "Alt":
								break;
							case "Super":
								break;
							case "ContextMenu":
								break;
							case "ArrowRight":
								if (note.charPos < note.text[note.linePos].length) note.charPos += 1;
								else if (note.linePos + 1 < note.text.length) {
									note.linePos += 1;
									note.charPos = 0;
								}
								break;
							case "ArrowLeft":
								if (note.charPos > 0) note.charPos -= 1;
								else if (note.linePos > 0) {
									(note.linePos -= 1), (note.charPos = note.text[note.linePos].length);
								}
								break;
							case "ArrowDown":
								if (note.linePos+1 < notes[id].text.length) {
									note.linePos += 1;
								}
								break;
							case "ArrowUp":
								if (notes[id].text.length > 0 && notes[id].linePos > 0) {
									note.linePos -= 1;
								}
								break;
							case "Backspace":
								if (notes[id].linePos > 1 && notes[id].charPos == 0) {
									notes[id].text.splice(notes[id].linePos, 1)
									notes[id].linePos -= 1;
									notes[id].charPos = note.text[notes[id].linePos].length;
								} else if (notes[id].charPos > 0) {
									notes[id].text[note.linePos] = [
										notes[id].text[note.linePos].slice(0, note.charPos - 1),
										notes[id].text[note.linePos].slice(note.charPos)
									].join("");
									note.charPos -= 1;
								}
								break;
							case "Delete":
								if (note.charPos == notes[id].text[note.linePos].length) {
									notes[id].text[note.linePos + 1][0].slice();
									notes[id].text.pop();
								} else if (note.charPos > 0 && notes[id].text[note.linePos] != "") {
									notes[id].text[note.linePos] = [
										notes[id].text[note.linePos].slice(0, note.charPos - 1),
										notes[id].text[note.linePos].slice(note.charPos)
									].join("");
									note.charPos -= 1;
								}
								break;
							case "Shift":
								break;
							default:
								notes[id].text[note.linePos] = [
									notes[id].text[note.linePos].slice(0, note.charPos),
									e.key,
									notes[id].text[note.linePos].slice(note.charPos)
								].join("");
								note.charPos += 1;
								break;
						}
					return notes;
				});
			}
		});
	};

	const handleScroll = (e: WheelEvent) => {
		const factor = 1.2;
		const mousePos = new Vec(e.clientX - canvas.offsetLeft, -(e.clientY - canvas.offsetTop));
		const globalMousePos = cameraToGlobal(mousePos, $cameraPos, $zoom);

		if (e.deltaY > 0) {
			//TODO: implement x^-a or 1/x^a
			zoom.update((z) => (z /= factor));
			cameraPos.update((pos) => pos.sub(globalMousePos).scale(factor).add(globalMousePos));
		} else if (e.deltaY < 0 && $zoom < 160) {
			zoom.update((z) => (z *= factor));
			cameraPos.update((pos) => pos.sub(globalMousePos).div(factor).add(globalMousePos));
		}

		// update last with new camera position
		// const { x, y } = $cameraPos;
		// last.update(() => new Vec(-x, y).scale($zoom));
	};

	const handleMenuOpen = (e: MouseEvent) => {
		menuIsOpen.set(true);
		menuPos.set(new Vec(e.clientX, e.clientY));
	};

	let lastC = new Vec(0,0)

	let s = false

	const handleMouseEnter = (e: MouseEvent) => {
		s = false
	}

	const handleMouseMove2 = (e: MouseEvent) => { 
		const d = new Vec(e.offsetX, e.offsetY).sub(lastC)
		if (s && e.buttons == 1) { 
			// console.log("test")
			// console.log(d)
			// if (d.x != e.movementX || d.y != e.movementY) {
			// 	console.log(d, "---", e.movementX, e.movementY)
			// }
			cameraPos.update((pos) => pos.add(new Vec(-d.x, d.y).div($zoom)));
		}
		lastC = new Vec(e.offsetX, e.offsetY)
		s = true
		// let d = new Vec(e.clientX - startC.x, e.clientY - startC.y)
		// console.log("start", startC, "last", lastC)
		// if (e.movementX != d.sub(lastC).x || e.movementY != d.sub(lastC).y) {
		// 	console.log(d.sub(lastC), "---", e.movementX, e.movementY)
		// }
		// // console.log(e.movementX == d.sub(lastC).x, e.movementY == d.sub(lastC).y)
		// lastC = d
	}

	onMount(handleResize);
</script>

<svelte:window on:resize={handleResize} />

<canvas
	tabindex="-1"
	class="flex-grow cursor-pointer select-none"
	bind:this={canvas}
	on:contextmenu|preventDefault={handleMenuOpen}
	on:mousedown={handleMouseDown}
	on:mouseenter={handleMouseEnter}
	on:mousemove={handleMouseMove2}
	on:mouseup={handleMouseUp}
	on:keydown={handleKeyDown}
	on:wheel={handleScroll}
/>

{#if $menuIsOpen}<Menu />{/if}
