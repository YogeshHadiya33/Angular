import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../business_logic/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'todo',
        loadComponent: () => import('./todo-list/todo-list.component').then((m) => m.TodoListComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'parent-child',
        loadComponent: () => import('./parent-child/parent/parent.component').then((m) => m.ParentComponent),
      },
      {
        path: 'pipes',
        loadComponent: () => import('./pipes/pipes.component').then((m) => m.PipesComponent),
      },
      {
        path: 'directives',
        loadComponent: () => import('./directives/directives.component').then((m) => m.DirectivesComponent),
      }
    ]
  }
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
