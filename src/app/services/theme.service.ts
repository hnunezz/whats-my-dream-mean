import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  readonly currentTheme = signal<'light' | 'dark'>('dark');

  toggleTheme(): void {
    this.currentTheme.update(value => (value === 'light' ? 'dark' : 'light'));
    document.body.classList.toggle('light-mode', this.currentTheme() === 'light');
    localStorage.setItem("theme", this.currentTheme());
  }

    setSession(key: string, input: string) {
    sessionStorage.setItem(key, input);
  }

  getSession(key: string) {
    return sessionStorage.getItem(key) as string;
  }

  hasSession(key: string) {
    return sessionStorage.getItem(key) !== null
  }

  deleteSession(key: string) {
    sessionStorage.removeItem(key)
  }
}
