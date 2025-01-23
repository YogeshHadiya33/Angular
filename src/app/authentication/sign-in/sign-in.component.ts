import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignInRequest } from '../../business_logic/models/signin.model';
import { AuthService } from '../../business_logic/services/auth.service';
import { LocalStorageService } from '../../business_logic/services/localstorage.service';
import { TOKEN_LOCAL_STORAGE_KEY, USER_DETAILS_LOCAL_STORAGE_KEY } from '../../shared/constants';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, LocalStorageService],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
 
  signInForm: FormGroup;
  errorMessage: string | null = null;
  isSubmitted = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      // saveDetails: [false]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.signInForm.valid) {
      const signInRequest: SignInRequest = {
        email: this.signInForm.value.email,
        password: this.signInForm.value.password
      };

      this.authService.signIn(signInRequest).subscribe({
        next: response => {
          this.errorMessage = null;
          // if (this.signInForm.value.saveDetails) {
          // }
          this.localStorageService.setItem(TOKEN_LOCAL_STORAGE_KEY, response.token);
          this.localStorageService.setItem(USER_DETAILS_LOCAL_STORAGE_KEY, response.userDetails);
          this.router.navigate(['/admin/dashboard']);
        },
        error: error => {
          console.error(error);
          this.errorMessage = error.error; // Set the error message to display to the user
        }
      });
    }
  }
}