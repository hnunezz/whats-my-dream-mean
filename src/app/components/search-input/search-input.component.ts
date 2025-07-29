import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_KEY } from '../../app.component';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-search-input',
  imports: [FormsModule, NgClass],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  private router = inject(Router);
  private sessionService = inject(SessionService);

  input = signal<string>('')

  constructor() {
    this.deleteSessions();
  }

  deleteSessions() {
    const SESSION_KEY_ENUM: typeof SESSION_KEY = SESSION_KEY;

    Object.values(SESSION_KEY_ENUM)
      .filter(e => typeof e === 'string')
      .map(k => {
        this.sessionService.deleteSession(k);
      });
  }

  meaningNavigate() {
    this.sessionService.setSession(SESSION_KEY.INPUT_KEY, this.input());
    this.router.navigate(['/meaning'])
  }
}
