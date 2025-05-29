import { Routes } from '@angular/router';
import { LayoutComponent } from './system/layout/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
  },
  {
    path: '**',
    redirectTo: 'auth/not-found',
    pathMatch: 'full',
  },
];
