import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LoginComponent],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);

    // Crea un espía para router.navigate que devuelve una promesa resuelta
    jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should send email and navigate to bienvenido if email exists', () => {
    const email = 'example@example.com';
    const responseMock = { exists: true };
  
    component.email = email;
    component.sendEmail();
  
    const request = httpTestingController.expectOne('http://localhost:3000/check-email');
    expect(request.request.method).toBe('POST');
    request.flush(responseMock);
  
    // Verifica si se llamó a router.navigate con los argumentos correctos
    expect(router.navigate).toHaveBeenCalledWith(['/bienvenido', { email }]);
  });
  
  it('should send verification email and navigate to tokken if email does not exist', () => {
    const email = 'example@example.com';
    const responseMock = { exists: false, tokenGenerado: 'someToken' };
  
    component.email = email;
    component.sendEmail();
  
    const request = httpTestingController.expectOne('http://localhost:3000/check-email');
    expect(request.request.method).toBe('POST');
    request.flush(responseMock);
  
    const verificationEmailRequest = httpTestingController.expectOne('http://localhost:3000/send-email');
    expect(verificationEmailRequest.request.method).toBe('POST');
    verificationEmailRequest.flush({ tokenGenerado: 'someToken' });
  
    // Verifica si se llamó a router.navigate con los argumentos correctos
    expect(router.navigate).toHaveBeenCalledWith(['/tokken', { email, token: 'someToken' }]);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.email).toBe('');
    expect(component.mensajeError).toBe('');
    expect(component.isSubmitting).toBe(false);
    expect(component.isTrue).toBe(false);
  });

  it('should send email and navigate to bienvenido if email exists', () => {
    const email = 'example@example.com';
    const responseMock = { exists: true };

    component.email = email;
    component.sendEmail();

    const request = httpTestingController.expectOne('http://localhost:3000/check-email');
    expect(request.request.method).toBe('POST');
    request.flush(responseMock);

    expect(router.navigate).toHaveBeenCalledWith(['/bienvenido', { email }]);
  });

  it('should send verification email and navigate to tokken if email does not exist', () => {
    const email = 'example@example.com';
    const responseMock = { exists: false, tokenGenerado: 'someToken' };

    component.email = email;
    component.sendEmail();

    const request = httpTestingController.expectOne('http://localhost:3000/check-email');
    expect(request.request.method).toBe('POST');
    request.flush(responseMock);

    const verificationEmailRequest = httpTestingController.expectOne('http://localhost:3000/send-email');
    expect(verificationEmailRequest.request.method).toBe('POST');
    verificationEmailRequest.flush({ tokenGenerado: 'someToken' });

    expect(router.navigate).toHaveBeenCalledWith(['/tokken', { email, token: 'someToken' }]);
  });

  it('should set mensajeError if email is not provided', () => {
    component.sendEmail();
    expect(component.mensajeError).toBe('Por favor, ingresa un correo electrónico válido.');
  });

  it('should set mensajeError if email check request fails', () => {
    component.email = 'example@example.com';
    const errorMessage = 'Error on request';
    const errorResponse = new ErrorEvent('error', {
      error: new Error(errorMessage),
    });

    component.sendEmail();

    const request = httpTestingController.expectOne('http://localhost:3000/check-email');
    expect(request.request.method).toBe('POST');
    request.error(errorResponse);

    expect(component.mensajeError).toBe('Error al verificar el correo. Por favor, inténtalo de nuevo.');
    expect(component.isSubmitting).toBe(false);
  });

  // Add more tests as needed

});
