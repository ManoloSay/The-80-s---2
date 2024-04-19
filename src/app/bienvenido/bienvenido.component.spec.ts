import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BienvenidoComponent } from './bienvenido.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('BienvenidoComponent', () => {
  let component: BienvenidoComponent;
  let fixture: ComponentFixture<BienvenidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BienvenidoComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ email: 'test@example.com' }),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(BienvenidoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize email from route params', () => {
    expect(component.email).toBe('test@example.com');
  });

  it('should detect data in navigation state', () => {
    component.ngOnInit();
    expect(component.email).toEqual('test@example.com');
  });

  it('should log a message when no data is detected in navigation state', () => {
    // Simula que no se detecta ningún dato en el estado de navegación
    Object.defineProperty(window.history, 'state', {
      value: {},
    });

    const consoleSpy = spyOn(console, 'log');
    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('No se detectan los datos');
  });

  // Agrega más pruebas según sea necesario para otros métodos y funcionalidades del componente
});