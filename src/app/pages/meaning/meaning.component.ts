import { Component, DestroyRef, inject } from '@angular/core';
import { AppService } from '../../app';
import { Router } from '@angular/router';
import { SESSION_KEY } from '../../app.component';
import { NgClass } from '@angular/common';
import { SessionService } from '../../services/session.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.sessionService.setSession(SESSION_KEY.PROMPT_KEY, res.dream as string);
        this.prompt_result = res.dream as string;
        this.loading = false;
      });
  }

  private hasPrompt() {
    return this.sessionService.hasSession(SESSION_KEY.PROMPT_KEY);
  }
}
