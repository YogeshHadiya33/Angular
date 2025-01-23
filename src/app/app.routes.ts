import { Routes } from '@angular/router';
import { GuestComponent } from './layout/guest/guest.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthGuard } from './business_logic/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: GuestComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./authentication/authentication.module').then((x) => x.AuthenticationModule)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./portal/portal.module').then((x) => x.PortalModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/sign-in'
  }
];