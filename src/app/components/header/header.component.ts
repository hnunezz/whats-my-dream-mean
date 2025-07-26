import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public themeService: ThemeService) {
    if (localStorage.getItem('theme') === 'light') {
      this.themeService.toggleTheme();
    }
  }
}
