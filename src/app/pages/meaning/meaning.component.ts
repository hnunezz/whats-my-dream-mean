import { Component, DestroyRef, inject } from '@angular/core';
import { AppService } from '../../app';
import { Router } from '@angular/router';
import { SESSION_KEY } from '../../app.component';
import { NgClass } from '@angular/common';
import { SessionService } from '../../services/session.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-meaning',
  imports: [NgClass],
  templateUrl: './meaning.component.html',
  styleUrl: './meaning.component.scss'
})
export class MeaningComponent {
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private appService = inject(AppService);
  private sessionService = inject(SessionService);

  input: string = '';
  prompt_result: string = '';
  loading: boolean = true;
  hasError: boolean = false;
  humor_selected: number = 0;

  constructor() {
    if (!this.sessionService.hasSession(SESSION_KEY.INPUT_KEY)) {
      this.router.navigate(["/"]);
      return;
    }

    this.input = this.sessionService.getSession(SESSION_KEY.INPUT_KEY);
    this.humor_selected = parseInt(this.sessionService.getSession(SESSION_KEY.HUMOR_KEY));

    this.sendPrompt();
  }

  homeNavigate() {
    this.router.navigate(['/'])
  }

  setHumor(type: number) {
    this.sessionService.setSession(SESSION_KEY.HUMOR_KEY, type.toString());
    this.humor_selected = type;
  }

  private sendPrompt() {
    if (this.validateInput()) return;

    if (this.hasPrompt()) {
      this.prompt_result = this.sessionService.getSession(SESSION_KEY.PROMPT_KEY);
      this.loading = false;
      return;
    }

    this.prompt();
  }

  private prompt() {
    this.appService
      .prompt(this.input)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: (res: any) => {
          this.sessionService.setSession(SESSION_KEY.PROMPT_KEY, res.dream as string);
          this.prompt_result = res.dream as string;
        },
        error: () => {
          this.loading = false;
          this.hasError = true;
        }
      });
  }

  private hasPrompt() {
    return this.sessionService.hasSession(SESSION_KEY.PROMPT_KEY);
  }


  private validateInput(): boolean {
    const message = 'Eu sei o que você tentou fazer 😆';

    //! Caso o dev tente burlar a regra de 500 caracteres
    const isTooLong = this.input.length > 500;

    //! Caso o dev tente adicionar manualmente um item na sessão
    const isEmpty = this.input.trim() === '';

    if (isTooLong || isEmpty) {
      alert(message);
      this.homeNavigate();
      return true;
    }

    return false;
  }
}
