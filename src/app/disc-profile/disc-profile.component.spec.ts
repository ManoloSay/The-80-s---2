import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscProfileComponent } from './disc-profile.component';
import { ActivatedRoute } from '@angular/router';

describe('DiscProfileComponent', () => {
  let component: DiscProfileComponent;
  let fixture: ComponentFixture<DiscProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscProfileComponent],
      providers: [ActivatedRoute],
    });
    fixture = TestBed.createComponent(DiscProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
