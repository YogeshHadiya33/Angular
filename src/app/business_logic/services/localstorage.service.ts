import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() { }

    // Store a string or object in local storage
    setItem(key: string, value: any): void {
        if (typeof value === 'string') {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    // Retrieve a string or object from local storage
    getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        if (item) {
            try {
                return JSON.parse(item) as T;
            } catch (e) {
                return item as unknown as T;
            }
        }
        return null;
    }

    // Remove an item from local storage
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    // Clear all items from local storage
    clear(): void {
        localStorage.clear();
    }
}