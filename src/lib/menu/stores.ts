import Vec from "$lib/canvas/vec";
import { writable } from "svelte/store";

export const menuIsOpen = writable(false);

export const menuPos = writable(new Vec(0, 0));
