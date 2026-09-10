import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Здесь только корневые маршруты.
// Маршрут 'register' живёт в AuthModule через RouterModule.forChild.
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];
