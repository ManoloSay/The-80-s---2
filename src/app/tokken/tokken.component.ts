import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-tokken',
  templateUrl: './tokken.component.html',
  styleUrls: ['./tokken.component.css']
})
export class TokkenComponent implements OnInit {
  tokenGenerado: string = '';
  tokenIngresado: string = '';
  nuevoToken: string = '';
  mensajeError: string = '';
  email: string = '';
  isSubmitting: boolean = false;
  tokenExpirationTime: number = 0;
  contador: number = 120;
  intervalId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.startContador();
    this.route.params.subscribe(params => {
      this.email = decodeURIComponent(params['email']);
      this.tokenGenerado = decodeURIComponent(params['token']);
    });
    setTimeout(() => {
      this.isSubmitting = true;
      this.updateTokenExpirationCounter();
    }, 120000);

    const navigationState = window.history.state;
    if (navigationState && navigationState.email && navigationState.authorized === true) {
      this.email = navigationState.email;
    } else {
      console.log('Entrada bloqueada por seguridad a token');
      this.router.navigate(['/login']);
    }
  }
    
  verifyToken(email: string, tokenIngresado: string) {
    this.http.post<any>('http://localhost:3000/verify-jwt-token', { email: email, token: tokenIngresado }).subscribe(
      (response) => {
        if (response.message === 'Token válido') {
          console.log('Código correcto');
          // Realiza las acciones necesarias si el token es válido
        } else {
          this.mensajeError = 'El código ingresado es incorrecto o ha expirado. Por favor, inténtalo de nuevo.';
        }
      },
      (error) => {
        console.log('Error al verificar el token:', error);
        this.mensajeError = 'Error al verificar el token. Por favor, inténtalo de nuevo.';
      }
    );
  }
  

  isTokenExpired(): boolean {
    const currentTime = Date.now();
    return currentTime > this.tokenExpirationTime;
  }

  submitToken() {
      this.actualizarRegistro().subscribe((response: any) => {
            console.log('Registro actualizado correctamente:', response);
  
            const navigationExtras: NavigationExtras = {
              state: {
                email: this.email,
                authorized: true
              }
            };
            this.router.navigate(['/dashboard', { email: this.email }], navigationExtras);
  
          },
          (error: any) => {
            console.error('Error al actualizar el registro:', error);
            this.mensajeError = 'Error al actualizar el registro. Por favor, inténtalo de nuevo.';
          }
        );
  }

  actualizarRegistro() {
    const url = 'http://localhost:3000/actualizar-registro';
    const data = { email: this.email };
    return this.http.post(url, data);
  }

  updateTokenExpirationCounter() {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeRemaining = this.tokenExpirationTime - currentTime;

    if (timeRemaining > 0) {
      // Actualiza el contador de tiempo restante en tu interfaz de usuario
    } else {
      this.isSubmitting = true;
      this.router.navigate(['/login']);
      console.log('Tiempo de espera expirado, volviendo al login.');
      this.mensajeError = 'Tu código ha expirado, reenvíalo o inténtalo de nuevo.';
    }
  }

  reenviar() {
    this.router.navigate(['/login']);
  }

  //contador visual
  startContador(): void {
    this.intervalId = setInterval(() => {
      this.contador--;

      if (this.contador === 0) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  resetContador(): void {
    clearInterval(this.intervalId);
    this.contador = 120 ;
    this.startContador();
  }
}
