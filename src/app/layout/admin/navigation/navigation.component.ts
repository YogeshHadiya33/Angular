import { Component, EventEmitter, Output } from '@angular/core';
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { NavContentComponent } from './nav-content/nav-content.component';
import { DattaConfig } from '../../../app-config';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavLogoComponent,NavContentComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  // public props
  @Output() NavCollapse = new EventEmitter();
  @Output() NavCollapsedMob = new EventEmitter();
  navCollapsed: any;
  navCollapsedMob = false;
  windowWidth = window.innerWidth;

  // constructor
  constructor() {
    this.navCollapsed = this.windowWidth >= 992 ?   DattaConfig.isCollapseMenu: false;
    
    console.log("navigation")
  }

  // public method
  navCollapse() {
    if (this.windowWidth >= 992) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 992) {
      this.NavCollapsedMob.emit();
    }
  }
}
