import { writable } from 'svelte/store';

export const offset = writable(0);
export const items = writable([]);
export const feedOffset = writable(0);
export const tweetId = writable(0);


