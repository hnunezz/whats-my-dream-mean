import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';

@Component({
  selector: 'app-home',
  imports: [SearchInputComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
