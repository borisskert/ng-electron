import { TestBed } from '@angular/core/testing';

import { LeveldownProvider } from './memdown.provider';

describe('MemdownProviderService', () => {
  let provider: LeveldownProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    provider = TestBed.get(LeveldownProvider);
  });

  it('should be created', () => {
    expect(provider).toBeTruthy();
  });

  it('should provide memdown', () => {
    const memdown = provider.get('any string which gets ignored');
    expect(memdown).toBeTruthy();
  });
});
