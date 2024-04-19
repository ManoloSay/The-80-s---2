import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EditardatosComponent } from './editardatos.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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

describe('EditardatosComponent', () => {
  let component: EditardatosComponent;
  let fixture: ComponentFixture<EditardatosComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let httpClientSpy: { get: jest.Mock; post: jest.Mock };

  beforeEach(async () => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [EditardatosComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ email: 'test@example.com' }),
            snapshot: { paramMap: { get: () => 'test@example.com' } },
          },
        },
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditardatosComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data', () => {
    const userData: UserData = {
      username: 'testUser',
      nombre: 'John',
      apellido1: 'Doe',
      apellido2: 'Smith',
      fechaNacimiento: '1990-01-01',
      sexo: 'Masculino',
      formacionUniversitaria: 'Ingeniería',
      centroEducativo: 'Universidad XYZ',
      documentoIdentificacion: '1234567890',
      formacion: 'Formación adicional',
      ciudad: 'Ciudad de Ejemplo',
      provincia: 'Provincia de Ejemplo',
      codigoPostal: '12345',
    };
    httpClientSpy.get.mockReturnValue(of(userData));
    component.obtenerDatosUsuario();
    expect(component.username).toEqual('testUser');
  });

  it('should navigate to bienvenido', () => {
    component.navegarHome_enviarDatos();
    expect(router.navigate).toHaveBeenCalledWith(['/bienvenido'], {
      state: {
        email: 'test@example.com',
      },
    });
  });

  it('should save user data', () => {
    component.username = 'testUser';
    component.nombre = 'John';
    component.apellido1 = 'Doe';
    component.apellido2 = 'Smith';
    component.fechaNacimiento = '1990-01-01';
    component.sexo = 'Masculino';
    component.formacionUniversitaria = 'Ingeniería';
    component.centroEducativo = 'Universidad XYZ';
    component.documentoIdentificacion = '1234567890';
    component.formacion = 'Formación adicional';
    component.ciudad = 'Ciudad de Ejemplo';
    component.provincia = 'Provincia de Ejemplo';
    component.codigoPostal = '12345';
    component.email = 'test@example.com';

    httpClientSpy.post.mockReturnValue(of({}));
    component.guardarDatosUsuario();
    expect(httpClientSpy.post).toHaveBeenCalledWith('http://localhost:3000/save-user-data', {
      username: 'testUser',
      nombre: 'John',
      apellido1: 'Doe',
      apellido2: 'Smith',
      fechaNacimiento: '1990-01-01',
      sexo: 'Masculino',
      formacionUniversitaria: 'Ingeniería',
      centroEducativo: 'Universidad XYZ',
      documentoIdentificacion: '1234567890',
      formacion: 'Formación adicional',
      ciudad: 'Ciudad de Ejemplo',
      provincia: 'Provincia de Ejemplo',
      codigoPostal: '12345',
      email: 'test@example.com',
    });
  });
});
