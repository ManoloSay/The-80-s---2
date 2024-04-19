import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistsProfileComponent } from './artists-profile.component';
import { HttpClient } from '@angular/common/http';

describe('ArtistsProfileComponent', () => {
  let component: ArtistsProfileComponent;
  let fixture: ComponentFixture<ArtistsProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistsProfileComponent],
      providers: [HttpClient],
    });
    fixture = TestBed.createComponent(ArtistsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
