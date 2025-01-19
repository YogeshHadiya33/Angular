import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PortalRoutingModule,
    SharedModule,
    ToastrModule.forRoot() // ToastrModule added
  ]
})
export class PortalModule { }
