import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';


export enum SESSION_KEY {
  INPUT_KEY = 'input-key',
  PROMPT_KEY = 'prompt_key',
  HUMOR_KEY = 'humor_key'
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Whats does my dream mean ✨';

  constructor(public themeService: ThemeService) {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('theme') === 'light') {
        this.themeService.toggleTheme();
      }
    }
  }
}
