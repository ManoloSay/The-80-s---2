import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    beforeEach(() => {
      TestBed.configureTestingModule({});
    });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
