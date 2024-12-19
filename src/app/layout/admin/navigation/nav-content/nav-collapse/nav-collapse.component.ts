import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationItem } from '../../navigation';
import { RouterModule } from '@angular/router';
import { NavGroupComponent } from '../nav-group/nav-group.component';
import { NavItemComponent } from '../nav-item/nav-item.component';

@Component({
  selector: 'app-nav-collapse',
  standalone: true,
  imports: [CommonModule,RouterModule,NavGroupComponent,NavItemComponent],
  templateUrl: './nav-collapse.component.html',
  styleUrl: './nav-collapse.component.scss'
})
export class NavCollapseComponent {
  // public props
  visible = false;
  @Input()  item!: NavigationItem;

  // public method
  navCollapse(e: { target: any; }) {
    this.visible = !this.visible;
    let parent = e.target;
    parent = parent.parentElement;

    const sections = document.querySelectorAll('.pcoded-hasmenu');
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] !== parent) {
        sections[i].classList.remove('pcoded-trigger');
      }
    }
    let first_parent = parent.parentElement;
    let pre_parent = parent.parentElement.parentElement;
    if (first_parent.classList.contains('pcoded-hasmenu')) {
      do {
        first_parent.classList.add('pcoded-trigger');
        first_parent = first_parent.parentElement.parentElement.parentElement;
      } while (first_parent.classList.contains('pcoded-hasmenu'));
    } else if (pre_parent.classList.contains('pcoded-submenu')) {
      do {
        pre_parent.parentElement.classList.add('pcoded-trigger');
        pre_parent = pre_parent.parentElement.parentElement.parentElement;
      } while (pre_parent.classList.contains('pcoded-submenu'));
    }
    parent.classList.toggle('pcoded-trigger');
  }
}
