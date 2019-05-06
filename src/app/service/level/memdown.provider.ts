import { Injectable } from '@angular/core';
import * as memdown from 'memdown';
import { AbstractLeveldownProvider } from './abstract-leveldown.provider';

/**
 * Provides the MemDown used in unit tests.
 * See https://github.com/Level/memdown
 */
@Injectable({
  providedIn: 'root'
})
export class LeveldownProvider extends AbstractLeveldownProvider {
  get(name: string) {
    return memdown();
  }
}
