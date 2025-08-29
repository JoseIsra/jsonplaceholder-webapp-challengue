import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

export default [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'usuarios',
        pathMatch: 'full',
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/usuarios/usuarios.component').then(
            (c) => c.UsuariosComponent,
          ),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./pages/posts/posts.component').then((c) => c.PostsComponent),
      },
    ],
  },
] satisfies Routes;
