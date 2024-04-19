import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-otherdata',
  templateUrl: './otherdata.component.html',
  styleUrls: ['./otherdata.component.css']
})
export class OtherdataComponent implements OnInit{
  email: string = '';
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
  edad: number = 0;
  edadStatus: string='';
  
constructor (
  private auth: AuthService,
  private router: Router,
  private httpClient: HttpClient,
  private route: ActivatedRoute
) {}

  ngOnInit(): void {
    const navigationState = window.history.state;
    if (navigationState && navigationState.email && navigationState.authorized === true) {
      this.email = navigationState.email;
    } else {
      console.log('Entrada bloqueada por seguridad a otherdata');
      this.router.navigate(['/login']);
    }
    this.obtenerDatosUsuario();
  }
  
  obtenerDatosUsuario() {
    // Realiza una solicitud HTTP GET para obtener los datos del usuario basados en su correo electrónico
    this.httpClient.get<UserData>(`http://localhost:3000/obtener-datos-usuario?email=${this.email}`)
      .subscribe((data: UserData) => {
        // Actualiza los campos del formulario con los datos del usuario
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
  
        // Calcular la edad a partir de la fecha de nacimiento
        const fechaNacimientoArray = this.fechaNacimiento.split('-'); // Supongo que la fecha está en formato 'YYYY-MM-DD'
        const fechaNacimientoDate = new Date(
          parseInt(fechaNacimientoArray[0]),
          parseInt(fechaNacimientoArray[1]) - 1, // El mes comienza desde 0
          parseInt(fechaNacimientoArray[2])
        );
        const hoy = new Date();
        this.edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
  
        // Comprobar si es mayor o menor de edad
        if (this.edad < 18) {
          this.edadStatus = 'Younger';
        } else {
          this.edadStatus = 'Adult';
        }
      }, error => {
        console.error('Error al obtener los datos del usuario:', error);
      });
  }

  recargarDatosUsuario() {
    this.obtenerDatosUsuario();
    console.log('Datos Cargados');
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
