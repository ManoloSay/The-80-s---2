import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../servicios/auth.service';


interface UserData {
  username: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  fechaNacimiento: string;
  sexo: string;
  formacionUniversitaria: string;
  centroEducativo: string;
  documentoIdentificacion: string;
  formacion: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
}

@Component({
  selector: 'app-editardatos',
  templateUrl: './editardatos.component.html',
  styleUrls: ['./editardatos.component.css']
})
export class EditardatosComponent implements OnInit {
  perfilUrl: string = 'https://th.bing.com/th/id/OIP.l7wFjokaGcB5GQ8TkV-hlwHaHK?pid=ImgDet&rs=1';
  email: string = 'Error email';
  claveEmail: string = '';

  username: string = '';
  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  fechaNacimiento: string = '';
  sexo: string = '';
  formacionUniversitaria: string = '';
  centroEducativo: string = '';
  documentoIdentificacion: string = '';
  formacion: string = '';
  ciudad: string = '';
  provincia: string = '';
  codigoPostal: string = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });
  }

  obtenerDatosUsuario() {
    this.httpClient.get<UserData>(`http://localhost:3000/obtener-datos-usuario?email=${this.email}`).subscribe((data: UserData) => {
        this.username = data.username;
        this.nombre = data.nombre;
        this.apellido1 = data.apellido1;
        this.apellido2 = data.apellido2;
        this.fechaNacimiento = data.fechaNacimiento;
        this.sexo = data.sexo;
        this.formacionUniversitaria = data.formacionUniversitaria;
        this.centroEducativo = data.centroEducativo;
        this.documentoIdentificacion = data.documentoIdentificacion;
        this.formacion = data.formacion;
        this.ciudad = data.ciudad;
        this.provincia = data.provincia;
        this.codigoPostal = data.codigoPostal;
      }, error => {
        console.error('Error al obtener los datos del usuario:', error);
      });
  }

  ngOnInit() {
    const navigationState = window.history.state;
    if (navigationState && navigationState.email && navigationState.authorized === true) {
      this.email = navigationState.email;
    } else {
      console.log('Entrada bloqueada por seguridad a editardatos');
      this.router.navigate(['/login']);
    }
    this.obtenerDatosUsuario();
  }

  guardarDatosUsuario() {
    const formData = {
      email: this.email,
      username: this.username,
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      fechaNacimiento: this.fechaNacimiento,
      sexo: this.sexo,
      formacionUniversitaria: this.formacionUniversitaria,
      centroEducativo: this.centroEducativo,
      documentoIdentificacion: this.documentoIdentificacion,
      formacion: this.formacion,
      ciudad: this.ciudad,
      provincia: this.provincia,
      codigoPostal: this.codigoPostal
    };
    this.httpClient.post<any>('http://localhost:3000/save-user-data', formData)
      .subscribe(response => {
        console.log('Datos del usuario guardados correctamente:', response);
      }, error => {
        console.error('Error al guardar los datos del usuario:', error);
      });
      this.authoritzedOtherdata();
  }

    //Seguridad
    navegarHome_enviarDatos() {
      const navigationExtras: NavigationExtras = {
        state: {
          email: this.email,
          authorized: true
        }
      };
      
      this.router.navigate(['/bienvenido', { email: this.email }], navigationExtras);
    }

    navegarPerfil_enviarDatos() {
      const navigationExtras: NavigationExtras = {
        state: {
          email: this.email,
          authorized: true
        }
      };
      
      this.router.navigate(['/perfil', { email: this.email }], navigationExtras);
    }

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