import Vec from "$lib/canvas/vec";
import { writable } from "svelte/store";
import Note from "./note";

export const cameraPos = writable(new Vec(0, 0));
export const startCoords = writable(new Vec(0, 0));
export const last = writable(new Vec(0, 0));
export const zoom = writable(1);

export const notes = writable([new Note(-25, -25)]);
