import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

/** @type {import('svelte/store').Writable<any[]>} */
export const messages = writable([]);

export const AddMessage = (message, isError) => {
    messages.update((msgs) => [...msgs, { msg: message, isError: isError }]);
}

export const initGlobalErrorHandler = () => {
    if (!browser) return;

    window.onerror = (message, source, lineno, colno, error) => {
        console.error('Global Error:', message, source, lineno, colno, error);
        AddMessage(`Ошибка: ${message}`, true)
        return false;
    };

    window.onunhandledrejection = (event) => {
        console.error('Unhandled Promise Rejection:', event.reason);
        const reason = event.reason?.message || event.reason || 'Неизвестная ошибка';
        AddMessage(`Ошибка: ${reason}`, true)
        return false;
    };
};