import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  set(key: string, data: any): void {
    if (!this.isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string): any {
    if (!this.isBrowser) return null;
    try {
      const data = window.localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  }

  remove(key: string): void {
    if (!this.isBrowser) return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage', e);
    }
  }
}
