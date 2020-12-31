import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardsGuard } from './auth-guards.guard';

describe('AuthGuardsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsGuard]
    });
  });

  it('should ...', inject([AuthGuardsGuard], (guard: AuthGuardsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
