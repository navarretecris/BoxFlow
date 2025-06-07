import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'exercises',
    loadComponent: () =>
      import('./pages/exercises/exercises.page').then((m) => m.ExercisesPage),
  },
  {
    path: 'exercise-detail/:id',
    loadComponent: () =>
      import('./pages/exercise-detail/exercise-detail.page').then(
        (m) => m.ExerciseDetailPage
      ),
  },

  {
    path: 'exercise-form',
    loadComponent: () =>
      import('./pages/exercise-form/exercise-form.page').then(
        (m) => m.ExerciseFormPage
      ),
  },

  {
    path: 'exercise-form/:id',
    loadComponent: () =>
      import('./pages/exercise-form/exercise-form.page').then(
        (m) => m.ExerciseFormPage
      ),
  },
  
  {
    path: 'clases',
    loadComponent: () => import('./pages/clases/clases.page').then( m => m.ClasesPage)
  },
  {
    path: 'scheduled-classes',
    loadComponent: () => import('./pages/scheduled-classes/scheduled-classes.page').then( m => m.ScheduledClassesPage)
  },
  
];
