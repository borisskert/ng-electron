import { TestBed } from '@angular/core/testing';

import { LeveldownProvider } from './level-js.provider';

describe('LeveljsProviderService', () => {
  let provider: LeveldownProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    provider = TestBed.get(LeveldownProvider);
  });

  it('should be created', () => {
    expect(provider).toBeTruthy();
  });

  it('should provide level-js', () => {
    const leveljs = provider.get('level-js-storage-for-testing');
    expect(leveljs).toBeTruthy();
  });
});
