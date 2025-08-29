import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/usuarios',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./presentation/features/dashboard/dashboard.routes'),
  },
];
