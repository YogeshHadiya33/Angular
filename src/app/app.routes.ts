import { Routes } from '@angular/router';
import { GuestComponent } from './layout/guest/guest.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthGuard } from './authentication/guard/auth.guard';

export const routes: Routes = [

    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./portal/portal.module').then((x) => x.PortalModule),
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: '',
        component: GuestComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () => import('./authentication/authentication.module').then((x) => x.AuthenticationModule),
            }
        ]
    }
];
