import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   themeService = inject(ThemeService);
}
