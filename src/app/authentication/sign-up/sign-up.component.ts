import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignUpRequest } from '../../business_logic/models/signup.model';
import { AuthService } from '../../business_logic/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isSubmitted = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.signUpForm.valid) {
      const signUpRequest: SignUpRequest = {
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        confirmPassword: this.signUpForm.value.confirmPassword,
        roleName: 'USER'
      };

      this.authService.signUp(signUpRequest).subscribe({
        next: response => {
          this.errorMessage = null;
          this.successMessage = 'Account created successfully. Please sign in to continue.'; 
          this.signUpForm.reset();
          this.isSubmitted = false;
        },
        error: error => {
          console.error(error);
          this.successMessage = null;
          this.errorMessage = error.message; // Set the error message to display to the user
          this.isSubmitted = false;
        }
      });
    }
  }
}