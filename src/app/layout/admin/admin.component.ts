import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { DattaConfig } from '../../app-config';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,NavBarComponent,RouterModule,NavigationComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent{
  navCollapsed: any;
  navCollapsedMob: boolean;
  windowWidth: number;

  constructor(private location: Location) {
    let current_url = this.location.path();
    const baseHref = this.location.prepareExternalUrl('');
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }  
    this.windowWidth = window.innerWidth;
    this.navCollapsed = this.windowWidth >= 992 ?  DattaConfig.isCollapseMenu : false;
    this.navCollapsedMob = false;

    console.log("admin")
  }

  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    if (document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')) {
      document.querySelector('app-navigation.pcoded-navbar')?.classList.remove('mob-open');
    }
  }
}
