import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MeaningComponent } from './pages/meaning/meaning.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "meaning",
    component: MeaningComponent,
  }
];
