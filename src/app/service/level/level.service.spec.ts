import { TestBed } from '@angular/core/testing';

import { LevelService } from './level.service';
import { LeveldownProvider } from './memdown.provider';
import { AbstractLeveldownProvider } from './abstract-leveldown.provider';

describe('LevelService', () => {
  let service: LevelService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AbstractLeveldownProvider,
            useClass: LeveldownProvider
          }
        ]
      });
      service = TestBed.get(LevelService);
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should put into db', async () => {
    const nothing = await service.put('our key for testing', 'our value for testing').toPromise();
    expect(nothing).toBeNull();

    const value = await service.get('our key for testing').toPromise();
    expect(value).toEqual('our value for testing');
  });

  it('try to read non-existent', async () => {
    try {
      await service.get('our key for testing').toPromise();
      fail('Should throw error');
    } catch (error) {
      expect(error.toString()).toEqual('NotFoundError: Key not found in database [our key for testing]');
    }
  });
});
