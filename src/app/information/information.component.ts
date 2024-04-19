import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {
  email: string = '';

  constructor (
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const navigationState = window.history.state;
    if (navigationState && navigationState.email && navigationState.authorized === true) {
      this.email = navigationState.email;
    } else {
      console.log('Entrada bloqueada por seguridad a information');
      this.router.navigate(['/login']);
    }
  }

    //Seguridad
    authoritzedProfile () {
      const navigationExtras: NavigationExtras = {
        state: {
          email: this.email,
          authorized: true
        }
      };
      
      this.router.navigate(['/perfil', { email: this.email }], navigationExtras);
    }
  
    authoritzedBienvenido () {
      const navigationExtras: NavigationExtras = {
        state: {
          email: this.email,
          authorized: true
        }
      };
      
      this.router.navigate(['/bienvenido', { email: this.email }], navigationExtras);
    }
  
    authoritzedOtherdata () {
      const navigationExtras: NavigationExtras = {
        state: {
          email: this.email,
          authorized: true
        }
      };
      
      this.router.navigate(['/otherdata', { email: this.email }], navigationExtras);
    }
  
    authoritzedEditardatos () {
      const navigationExtras: NavigationExtras = {
        state: {
          email: this.email,
          authorized: true
        }
      };
      
      this.router.navigate(['/editardatos', { email: this.email }], navigationExtras);
    }
  
    authoritzedInformation () {
      const navigationExtras: NavigationExtras = {
        state: {
          email: this.email,
          authorized: true
        }
      };
      
      this.router.navigate(['/information', { email: this.email }], navigationExtras);
    }

}
