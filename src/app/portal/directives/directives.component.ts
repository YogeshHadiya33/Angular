import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HoverHighlightDirective } from '../../shared/directives/hover-hightlight.directive';
import { IfAuthenticatedDirective } from '../../shared/directives/if-authenticated.directive';

@Component({
  selector: 'app-directives',
  standalone: true,
  imports: [CommonModule,HoverHighlightDirective,IfAuthenticatedDirective],
  templateUrl: './directives.component.html',
  styleUrl: './directives.component.scss'
})
export class DirectivesComponent {

  isLoggedIn = false;
  items:any=["item1","item2","item3","item4","item5"];
  role="admin";
  isSuccess=true;
  fontSize=25;
  fontColor="blue";
}
