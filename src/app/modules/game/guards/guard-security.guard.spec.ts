import { TestBed } from '@angular/core/testing';

import { GuardSecurityGuard } from './guard-security.guard';

describe('GuardSecurityGuard', () => {
  let guard: GuardSecurityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardSecurityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
