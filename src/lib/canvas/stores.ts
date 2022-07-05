import { writable } from "svelte/store";
import type Note from "./note";
import Vec from "../common/vec";

export const cameraPos = writable(new Vec(0, 0));
export const startCoords = writable(new Vec(0, 0));
export const last = writable(new Vec(0, 0));
export const zoom = writable(1);

export const notes = writable([] as Note[]);
