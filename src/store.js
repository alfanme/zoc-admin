import { writable } from 'svelte/store';

export const results = writable([]);
export const selectedAlamat = writable([]);

export const showAddModal = writable(false);
export const showEditModal = writable(false);
export const showSenderModal = writable(false);
export const idToEdit = writable('');

export const isLogged = writable(false);
