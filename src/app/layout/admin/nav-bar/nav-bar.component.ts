import { Component, EventEmitter, Output } from '@angular/core';
import { NavRightComponent } from './nav-right/nav-right.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,RouterModule, NavRightComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent  {
  // public props
  @Output() NavCollapsedMob = new EventEmitter();
  navCollapsedMob = false;
  headerStyle: string = '';
  menuClass: boolean = false;
  collapseStyle: string = 'none';

  // public method
  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.headerStyle = this.menuClass ? 'none' : '';
    this.collapseStyle = this.menuClass ? 'block' : 'none';
  }
}