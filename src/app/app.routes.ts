import { Routes } from '@angular/router';
import { GuestComponent } from './layout/guest/guest.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { AdminComponent } from './layout/admin/admin.component';

export const routes: Routes = [
    
    {
        path:'',
        component:AdminComponent,
        children:[
            {
                path:'',
                loadChildren:()=> import('./portal/portal.module').then((x)=>x.PortalModule)
            }
        ]
    } ,
    {
        path:'',
        component:GuestComponent,
        children:[
            {
                path:'auth',
                loadChildren:()=>import('./authentication/authentication.module').then((x)=>x.AuthenticationModule)
            }
        ]
    }
];
