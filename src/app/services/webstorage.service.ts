import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebStorageService {
  constructor() {}

  get(key: string) {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  }

  set(key: string, data: any) {
    const value = JSON.stringify(data);
    window.localStorage.setItem(key, value);
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
