import { Injectable } from '@angular/core';
import * as Electron from 'electron';
import { ElectronWindow } from '../typings/electron-window.type';

declare let window: ElectronWindow;

@Injectable()
export class ElectronService {
  private electronRenderer: Electron.RendererInterface = null;

  public get remote(): Electron.Remote {
    return this.electron ? this.electron.remote : null;
  }

  public require(module: string) {
    if (window && window.require) {
      return window.require(module);
    }
  }

  private get electron(): Electron.RendererInterface {
    if (!this.electronRenderer) {
      this.electronRenderer = this.require('electron');
    }

    return this.electronRenderer;
  }
}
