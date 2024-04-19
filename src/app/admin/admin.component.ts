import { ActivatedRoute, NavigationExtras, Route } from '@angular/router';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  correo: string;
  registrado: boolean;
  token: number;
  zrole: string;
  [key: string]: string | number | boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  datosBaseDeDatos: { [key: string]: Usuario } = {};
  email = '';
  showModal = false;
  selectedRole = 'user';
  closeResult = '';
  nuevoCorreo = '';
  nuevoToken = '';
  usuarioSeleccionado = '';
  usuarioEditando: string | null = null;
  nuevaCredencial: string = '';
  editMode = false;
  usuarioEnEdicion: number | null = null;
  rolesOrder = ['superadmin', 'admin', 'editor', 'user'];
  nuevoRegistrado = 'true';
  showAddUserModal = false;
  newUser: any = { email: '', zrole: 'user', token: 0, registrado: false };
  showAddAccountForm = false;
  showAddArtistForm = false;
  showUsersContent: boolean = true;
  newArtist: any = { artistName: '', genre: '' };
  currentColor: string = '';
  hoveredIndex: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.params.subscribe((params) => {
      this.email = params['email'];
    });
  }

  ngOnInit(): void {
    this.obtenerTodaLaBaseDeDatos();
    this.setupModalHandling();
  }

  setupModalHandling(): void {
    const openModalButton = document.getElementById('openModalButton');
    const closeModalButton = document.getElementById('closeModalButton');
    const modal = document.getElementById('modal');

    if (openModalButton && closeModalButton && modal) {
      openModalButton.addEventListener('click', () => {
        modal.classList.add('show');
      });

      closeModalButton.addEventListener('click', () => {
        modal.classList.remove('show');
      });
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.email = '';
    this.selectedRole = 'user';
  }

  submitForm() {
    console.log('Form submitted:', this.email, this.selectedRole);
    this.closeModal();
  }

  redirectToBienvenido() {
    const navigationExtras: NavigationExtras = {
      state: {
        email: this.email,
        authorized: true,
      },
    };

    this.router.navigate(
      ['/bienvenido', { email: this.email }],
      navigationExtras
    );
  }

  obtenerTodaLaBaseDeDatos() {
    this.http
      .get<any>('http://localhost:3000/obtener-toda-la-base-de-datos')
      .subscribe(
        (response) => {
          console.log('Base de datos obtenida:', response);
          this.datosBaseDeDatos = response;
        },
        (error) => {
          console.error('Error al obtener la base de datos:', error);
        }
      );
  }

  eliminarUsuario(userId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.http
        .delete(`http://localhost:3000/eliminar-usuario/${userId}`)
        .subscribe(
          (response) => {
            console.log('Usuario eliminado con éxito:', response);
            this.obtenerTodaLaBaseDeDatos();
          },
          (error) => {
            console.error('Error al eliminar usuario:', error);
          }
        );
    }
  }

  guardarCambios(usuario: any) {
    this.http
      .put(
        `http://localhost:3000/actualizar-usuario/${usuario.key}`,
        usuario.value
      )
      .subscribe(
        (response) => {
          console.log('Usuario actualizado con éxito:', response);
          this.obtenerTodaLaBaseDeDatos();
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    this.editMode = false;
    this.usuarioEnEdicion = null;
  }

  activarEdicion(index: number) {
    this.editMode = true;
    this.usuarioEnEdicion = index;
  }

  getRoleIndex(role: string): number {
    const rolesOrder = ['superadmin', 'admin', 'editor', 'user'];
    return rolesOrder.indexOf(role);
  }

  guardarNuevoUsuario() {
    const nuevoUsuario: Usuario = {
      correo: this.nuevoCorreo,
      registrado: this.nuevoRegistrado === 'true',
      token: parseInt(this.nuevoToken, 10),
      zrole: this.selectedRole,
    };

    this.http
      .post('http://localhost:3000/agregar-usuario', nuevoUsuario)
      .subscribe(
        (response) => {
          console.log('Usuario agregado con éxito:', response);
          this.obtenerTodaLaBaseDeDatos();
          this.closeModal();
        },
        (error) => {
          console.error('Error al agregar usuario:', error);
        }
      );
    this.showAddUserModal = false;
  }

  //boton

  openAddAccountForm() {
    this.showAddAccountForm = true;
  }

  saveNewUser() {
    const nuevoUsuario: Usuario = {
      correo: this.newUser.email,
      registrado: this.newUser.registrado === 'true',
      token: parseInt(this.newUser.token, 10),
      zrole: this.newUser.zrole,
    };

    this.http
      .post('http://localhost:3000/agregar-usuario', nuevoUsuario)
      .subscribe(
        (response) => {
          console.log('Usuario agregado con éxito:', response);
          this.showAddAccountForm = false;
          this.obtenerTodaLaBaseDeDatos();
        },
        (error) => {
          console.error('Error al agregar usuario:', error);
        }
      );
  }

  cancelNewUser() {
    this.showAddAccountForm = false;
    this.newUser = { email: '', zrole: 'user', token: 0, registrado: false };
  }

  toggleUsersContent() {
    this.showUsersContent = !this.showUsersContent;
  }

  //artist

  openAddArtistForm() {
    this.showAddArtistForm = true;
  }

  saveNewArtist() {
    console.log('Saving new artist:', this.newArtist);
    this.showAddArtistForm = false;
    this.guardarNuevoArtista();
    this.newArtist = { artistName: '', genre: '' };
  }

  cancelAddArtist() {
    this.newArtist = { artistName: '', genre: '' };
    this.showAddArtistForm = false;
  }

  guardarNuevoArtista() {
    if (!this.newArtist.artistName || !this.newArtist.genre) {
      console.error('Por favor, complete todos los campos del nuevo artista.');
      return;
    }
    this.http
      .post<any>('http://localhost:3000/agregar-artista', this.newArtist)
      .subscribe(
        (response) => {
          console.log('Artista agregado con éxito:', response);
        },
        (error) => {
          console.error('Error al agregar artista:', error);
        }
      );
  }

  changeColor(color: string): void {
    this.currentColor = color;
  }

  resetColor(): void {
    this.currentColor = '';
  }

  // filtros
  showRoleFilter: boolean = false;
  showAgeFilter: boolean = false;
  showOtherFilter: boolean = false;

  toggleRoleFilter() {
    this.showRoleFilter = !this.showRoleFilter;
  }

  toggleAgeFilter() {
    this.showAgeFilter = !this.showAgeFilter;
  }

  toggleOtherFilter() {
    this.showOtherFilter = !this.showOtherFilter;
  }

  filteredUsers: { [key: string]: Usuario } = {};

  applyFilters() {
    this.filteredUsers = Object.entries(this.datosBaseDeDatos)
      .filter(([key, user]) => user.zrole === this.selectedRole)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as { [key: string]: Usuario });
  }
}
