import { Injectable } from '@angular/core';
import { AbstractLeveldownProvider } from './abstract-leveldown.provider';

@Injectable({
  providedIn: 'root'
})
export class LeveldownProvider extends AbstractLeveldownProvider {
  get(name: string) {
    throw new Error('Should never happen. This class should be file-replaced in any environment');
  }
}
