import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from '../../../../business_logic/services/localstorage.service';
import { TOKEN_LOCAL_STORAGE_KEY, USER_DETAILS_LOCAL_STORAGE_KEY } from '../../../../shared/constants';
import { Router, RouterModule } from '@angular/router';
import { UserDetails } from '../../../../business_logic/models/signin.model';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../../business_logic/services/common.service';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [NgbModule, RouterModule],
  templateUrl: './nav-right.component.html',
  styleUrl: './nav-right.component.scss'
})
export class NavRightComponent {

  userDetails: UserDetails | null;

  constructor(private localStorageService: LocalStorageService,
    private commonService: CommonService
  ) {
    this.userDetails = this.localStorageService.getItem<UserDetails>(USER_DETAILS_LOCAL_STORAGE_KEY);
  }

  logout() {
    // this.localStorageService.removeItem(TOKEN_LOCAL_STORAGE_KEY);
    // this.localStorageService.removeItem(USER_DETAILS_LOCAL_STORAGE_KEY);
    // this.router.navigate(['/auth/sign-in']);
    this.commonService.logout();
  }
}
