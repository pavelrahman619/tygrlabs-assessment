import { Routes } from '@angular/router';
import { HomeWrapperComponent } from './pages/home/home-wrapper.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeWrapperComponent },
  { path: '**', redirectTo: '/home' }
];
