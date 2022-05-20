import Vec from "$lib/canvas/vec";
import { writable } from "svelte/store";

export const cameraPos = writable(new Vec(0, 0));
export const startCoords = writable(new Vec(0, 0));
export const last = writable(new Vec(0, 0));
export const zoom = writable(1);
