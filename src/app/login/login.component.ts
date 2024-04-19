import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  mensajeError: string = '';
  isSubmitting: boolean = false;
  isTrue: boolean = false;
  emailExists: boolean | null = null;
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router, private http: HttpClient) {}

  sendEmail() {
    if (this.email && !this.isSubmitting) {
      this.isSubmitting = true;
      this.checkIfEmailExists(this.email);
    } else {
      this.mensajeError = 'The box is empty, please enter a valid email.';
    }
  }

  checkIfEmailExists(email: string) {
    this.http
      .post<any>('http://localhost:3000/check-email', { email: email })
      .subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          this.emailExists = response.exists;

          if (response.exists) {
            console.log(
              'The email is already registered. Checking if you are registered'
            );
            const navigationExtras: NavigationExtras = {
              state: {
                email: this.email,
                authorized: true,
                role: response.role,
              },
            };

            if (response.role === 'admin' || response.role === 'superadmin') {
              console.log('Welcome ' + response.role);
              this.router.navigate(['/admin'], navigationExtras);
            } else {
              this.router.navigate(['/dashboard'], navigationExtras);
            }
          } else {
            console.log(
              'Mail without registration. Sending verification email...'
            );
            this.sendVerificationEmail();
          }
        },
        (error) => {
          console.log('Error verifying email:', error);
          this.mensajeError = 'Error verifying email. Please try again.';
          this.isSubmitting = false;
        }
      );
  }

  updateRegistrationToken(email: string) {
    const newToken = Math.floor(100000 + Math.random() * 900000);
    this.http
      .post<any>('http://localhost:3000/update-token', {
        email: email,
        token: newToken,
      })
      .subscribe(
        (response) => {
          console.log('Token updated, sending email again...');
        },
        (error) => {
          console.log('Error updating token:', error);
        }
      );
  }

  sendVerificationEmail() {
    this.http
      .post<any>('http://localhost:3000/send-email', { to_email: this.email })
      .subscribe(
        (response) => {
          console.log('Correo enviado');
          const navigationExtras: NavigationExtras = {
            state: {
              email: this.email,
              authorized: true,
            },
          };

          this.router.navigate(['/tokken'], navigationExtras);
        },
        (error) => {
          console.log('Error sending email:', error);
          this.mensajeError = 'Invalid email. Please try again.';
          this.isSubmitting = false;
        }
      );
  }
}
