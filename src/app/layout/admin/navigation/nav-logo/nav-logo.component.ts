import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-logo',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-logo.component.html',
  styleUrl: './nav-logo.component.scss'
})
export class NavLogoComponent {

  // public props
  @Input() navCollapsed: boolean=false;
  @Output() NavCollapse = new EventEmitter();
  windowWidth = window.innerWidth;

  // public method
  navCollapse() {
    if (this.windowWidth >= 992) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }
}
