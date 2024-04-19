import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TokkenComponent } from './tokken.component';

describe('TokkenComponent', () => {
  let component: TokkenComponent;
  let fixture: ComponentFixture<TokkenComponent>;
  let router: Router;
  let httpTestingController: HttpTestingController;

  const activatedRouteMock = {
    snapshot: {
      paramMap: new Map<string, string>().set('email', 'example@email.com').set('token', 'sampleToken')
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokkenComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    });

    fixture = TestBed.createComponent(TokkenComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize email and tokenGenerado from route params', () => {
    fixture.detectChanges();
    expect(component.email).toBe('example@email.com');
    expect(component.tokenGenerado).toBe('sampleToken');
  });

  it('should navigate to "/bienvenido" on successful token submission', () => {
    component.tokenIngresado = 'sampleToken';
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    component.submitToken();

    const req = httpTestingController.expectOne('http://localhost:3000/actualizar-registro');
    req.flush({});
    expect(navigateSpy).toHaveBeenCalledWith(['/bienvenido', component.email]);

    navigateSpy.mockRestore(); // Restaurar el espía después de la prueba
  });

  it('should set mensajeError on incorrect token submission', () => {
    component.tokenIngresado = 'incorrectToken';
    component.submitToken();
    expect(component.mensajeError).toBe('El código ingresado es incorrecto. Por favor, inténtalo de nuevo.');
  });

  it('should reenviar the email', () => {
    component.reenviar();
  });

  it('should update the record on successful HTTP request', () => {
    const responseMock = { /* Define un objeto de respuesta simulado si es necesario */ };
    component.actualizarRegistro().subscribe(
      (response: any) => {
        expect(response).toEqual(responseMock);
      },
      (error: any) => {
      }
    );
    const req = httpTestingController.expectOne('http://localhost:3000/actualizar-registro');
    req.flush(responseMock);
  });

  it('should handle error on failed HTTP request', () => {
    const errorMessage = 'Mensaje de error de ejemplo';
    component.actualizarRegistro().subscribe(
      (response: any) => {
      },
      (error: any) => {
        expect(error).toEqual(errorMessage);
      }
    );
    const req = httpTestingController.expectOne('http://localhost:3000/actualizar-registro');
    req.error(new ErrorEvent('Error de red', { message: errorMessage }));
  });

  it('should set mensajeError when tokenIngresado is incorrect', () => {
    component.tokenIngresado = 'incorrectToken';
    component.submitToken();
    expect(component.mensajeError).toBe('El código ingresado es incorrecto. Por favor, inténtalo de nuevo.');
  });

  it('should navigate to "/bienvenido" when tokenIngresado is correct', () => {
    component.tokenIngresado = component.tokenGenerado;
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    component.submitToken();

    const req = httpTestingController.expectOne('http://localhost:3000/actualizar-registro');
    req.flush({});
    expect(navigateSpy).toHaveBeenCalledWith(['/bienvenido', component.email]);

    navigateSpy.mockRestore(); // Restaurar el espía después de la prueba
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
