import { Injectable } from '@angular/core';
import { AbstractLeveldownProvider } from './abstract-leveldown.provider';
import * as leveljs from 'level-js';

/**
 * Provides level-js, which is used in angular environment
 * See https://github.com/Level/level-js
 */
@Injectable({
  providedIn: 'root'
})
export class LeveldownProvider extends AbstractLeveldownProvider {

  get(name: string) {
    return leveljs(name);
  }
}
