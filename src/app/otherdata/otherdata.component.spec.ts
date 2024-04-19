import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { OtherdataComponent } from './otherdata.component';

describe('OtherdataComponent', () => {
  let component: OtherdataComponent;
  let fixture: ComponentFixture<OtherdataComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherdataComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn(),
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherdataComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page if email is not provided', () => {
    jest.spyOn(console, 'log');
    jest.spyOn(activatedRoute.snapshot.paramMap, 'get').mockReturnValue(null);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(console.log).toHaveBeenCalledWith(
      'Entrada bloqueada por seguridad a otherdata'
    );
  });

  it('should call obtenerDatosUsuario method on ngOnInit', () => {
    jest.spyOn(component, 'obtenerDatosUsuario');
    component.ngOnInit();
    expect(component.obtenerDatosUsuario).toHaveBeenCalled();
  });

  it('should update form fields with user data on obtenerDatosUsuario', () => {
    const userData = {
      username: 'test-username',
      nombre: 'test-nombre',
      apellido1: 'test-apellido1',
      apellido2: 'test-apellido2',
      fechaNacimiento: '1990-01-01',
      sexo: 'test-sexo',
      formacionUniversitaria: 'test-formacionUniversitaria',
      centroEducativo: 'test-centroEducativo',
      documentoIdentificacion: 'test-documentoIdentificacion',
      formacion: 'test-formacion',
      ciudad: 'test-ciudad',
      provincia: 'test-provincia',
      codigoPostal: 'test-codigoPostal',
    };
    jest.spyOn(component['httpClient'], 'get');
    component.obtenerDatosUsuario();
    expect(component.username).toBe('');
    expect(component.nombre).toBe('');
    expect(component.apellido1).toBe('');
    expect(component.apellido2).toBe('');
    expect(component.fechaNacimiento).toBe('');
    expect(component.sexo).toBe('');
    expect(component.formacionUniversitaria).toBe('');
    expect(component.centroEducativo).toBe('');
    expect(component.documentoIdentificacion).toBe('');
    expect(component.formacion).toBe('');
    expect(component.ciudad).toBe('');
    expect(component.provincia).toBe('');
    expect(component.codigoPostal).toBe('');
  });

  it('should calculate age and set edad and edadStatus', () => {
    const fechaNacimiento = '1990-01-01';
    component.fechaNacimiento = fechaNacimiento;
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    const age = today.getFullYear() - birthDate.getFullYear();
    jest.spyOn(window, 'Date').mockReturnValue(today);
    component.obtenerDatosUsuario();
    expect(component.edad).toBe(0);
    expect(component.edadStatus).toBe(age < 18 ? 'Younger' : '');
  });

  it('should call obtenerDatosUsuario method on recargarDatosUsuario', () => {
    jest.spyOn(component, 'obtenerDatosUsuario');
    component.recargarDatosUsuario();
    expect(component.obtenerDatosUsuario).toHaveBeenCalled();
  });

  it('should navigate to perfil page with email state on authoritzedProfile', () => {
    component.email = 'test-email';
    component.authoritzedProfile();
    expect(router.navigate).toHaveBeenCalledWith([
      '/perfil',
      { email: 'test-email' },
      { state: { authorized: true, email: 'test-email' } },
    ]);
  });

  it('should navigate to bienvenido page with email state on authoritzedBienvenido', () => {
    component.email = 'test-email';
    component.authoritzedBienvenido();
    expect(router.navigate).toHaveBeenCalledWith([
      '/bienvenido',
      { email: 'test-email' },
      { state: { authorized: true, email: 'test-email' } },
    ]);
  });

  it('should navigate to otherdata page with email state on authoritzedOtherdata', () => {
    component.email = 'test-email';
    component.authoritzedOtherdata();
    expect(router.navigate).toHaveBeenCalledWith([
      '/otherdata',
      { email: 'test-email' },
      { state: { authorized: true, email: 'test-email' } },
    ]);
  });

  it('should navigate to editardatos page with email state on authoritzedEditardatos', () => {
    component.email = 'test-email';
    component.authoritzedEditardatos();
    expect(router.navigate).toHaveBeenCalledWith([
      '/editardatos',
      { email: 'test-email' },
      { state: { authorized: true, email: 'test-email' } },
    ]);
  });

  it('should navigate to information page with email state on authoritzedInformation', () => {
    component.email = 'test-email';
    component.authoritzedInformation();
    expect(router.navigate).toHaveBeenCalledWith([
      '/information',
      { email: 'test-email' },
      { state: { authorized: true, email: 'test-email' } },
    ]);
  });
});
