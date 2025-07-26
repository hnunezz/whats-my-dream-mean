import { Component } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';

@Component({
  selector: 'app-home',
  imports: [SearchInputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
