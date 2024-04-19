import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  email: string = '';
  claveEmail: string = '';
  perfilUrl: string = 'https://th.bing.com/th/id/OIP.l7wFjokaGcB5GQ8TkV-hlwHaHK?pid=ImgDet&rs=1';

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private auth: AuthService) {
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });
  }

  ngOnInit() {
    const navigationState = window.history.state;
    if (navigationState && navigationState.email && navigationState.authorized === true) {
      this.email = navigationState.email;
    } else {
      console.log('Entrada bloqueada por seguridad a bienvenido');
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
