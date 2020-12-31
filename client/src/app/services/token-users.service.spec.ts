import { TestBed } from '@angular/core/testing';

import { TokenUsersService } from './token-users.service';

describe('TokenUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenUsersService = TestBed.get(TokenUsersService);
    expect(service).toBeTruthy();
  });
});
