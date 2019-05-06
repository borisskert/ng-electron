import { Injectable } from '@angular/core';
import { AbstractLeveldownProvider } from './abstract-leveldown.provider';
import { ElectronService } from '../electron.service';

/**
 * Provides the leveldown, which is only usable in electron environment.
 * See https://github.com/Level/leveldown
 */
@Injectable({
  providedIn: 'root'
})
export class LeveldownProvider extends AbstractLeveldownProvider {

  constructor(private readonly electron: ElectronService) {
    super();
  }

  get(name: string) {
    const filepath = `${this.electron.remote.app.getPath('userData')}/${name}.db`;
    const leveldown = this.electron.require('leveldown');

    // @ts-ignore
    return leveldown(filepath);
  }
}
