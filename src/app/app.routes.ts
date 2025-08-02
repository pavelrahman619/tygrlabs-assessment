import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MobileHomeComponent } from './pages/mobile/mobile-home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mobile', component: MobileHomeComponent },
  { path: '**', redirectTo: '/home' }
];
