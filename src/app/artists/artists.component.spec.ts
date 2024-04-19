import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistsComponent } from './artists.component';
import { HttpClient } from '@angular/common/http';

describe('ArtistsComponent', () => {
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistsComponent],
      imports: [HttpClient],
    });
    fixture = TestBed.createComponent(ArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
