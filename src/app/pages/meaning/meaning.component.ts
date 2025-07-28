import { Component, inject } from '@angular/core';
import { AppService } from '../../app';
import { Router } from '@angular/router';
import { SESSION_KEY } from '../../app.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-meaning',
  imports: [NgClass],
  templateUrl: './meaning.component.html',
  styleUrl: './meaning.component.scss'
})
export class MeaningComponent {
  private router = inject(Router);
  private appService = inject(AppService);

  input: string = '';
  prompt_result: string = '';
  loading: boolean = true;
  humor_selected: number = 0;

  constructor() {
    if (!this.appService.has(SESSION_KEY.INPUT_KEY)) {
      this.router.navigate(["/"]);
      return;
    }

    this.input = this.appService.get(SESSION_KEY.INPUT_KEY);
    this.humor_selected = parseInt(this.appService.get(SESSION_KEY.HUMOR_KEY));
    this.getPrompt();
  }

  homeNavigate() {
    this.router.navigate(['/'])
  }

  setHumor(type: number) {
    this.appService.set(SESSION_KEY.HUMOR_KEY, type.toString());
    this.humor_selected = type;
  }



  private getPrompt() {
    if (this.appService.has(SESSION_KEY.PROMPT_KEY)) {
      this.prompt_result = this.appService.get(SESSION_KEY.PROMPT_KEY);
      this.loading = false;
      return;
    }

    this.appService.getss().subscribe(res => {
      // this.appService.set(SESSION_KEY.PROMPT_KEY,res as string);
      this.prompt_result = 'testee';
      this.loading = false;
    });
    // this.appService.prompt(this.input).subscribe(res => {
    //   this.appService.set(SESSION_KEY.PROMPT_KEY,res as string);
    //   this.prompt_result = res as string;
    //   this.loading = false;
    // });
  }
}
