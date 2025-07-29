import { NgClass } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
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

  @HostListener('document:keydown.enter', ['$event'])
  onEnterKeydown(event: KeyboardEvent): void {
    if (this.input() === '') return;

    this.meaningNavigate();
  }


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
    const input = this.sanitizeString(this.input());

    //!Quando aplicamos a limpeza na string
    //!Ela pode retornar "" (< >)
    //!Evitando levar pra sessão um ""
    if (input === "") {
      this.input.set('');
      return;
    }

    this.sessionService.setSession(SESSION_KEY.INPUT_KEY, input);
    this.router.navigate(['/meaning'])
  }

  private sanitizeString(inputString: string): string {
    if (inputString === null || inputString === undefined) {
      return "";
    }

    let cleaned = String(inputString);

    cleaned = cleaned.trim();
    cleaned = cleaned.replace(/\s+/g, ' ');
    cleaned = cleaned.replace(/['";`]/g, '');
    cleaned = cleaned.replace(/--|\/\*|\*\/|xp_cmdshell|exec\(/gi, '');
    cleaned = cleaned.replace(/<[^>]*>?/gm, '');
    cleaned = cleaned.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');

    return cleaned;
  }
}
