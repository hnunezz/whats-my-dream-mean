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
}
