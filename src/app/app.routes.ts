import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'exercises',
    loadComponent: () => import('./pages/exercises/exercises.page').then( m => m.ExercisesPage)
  },
  {
    path: 'exercise-detail/:id',
    loadComponent: () => import('./pages/exercise-detail/exercise-detail.page').then( m => m.ExerciseDetailPage)
  },
 
];
