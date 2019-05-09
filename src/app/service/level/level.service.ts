import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AbstractLeveldownProvider } from './abstract-leveldown.provider';
import * as levelup from 'levelup';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  private readonly options = {};

  private readonly db;

  constructor(private readonly leveldownProvider: AbstractLeveldownProvider) {
    const leveldown = leveldownProvider.get('ng-electron');
    this.db = levelup(leveldown);
  }

  public put(key: string, value: string): Observable<void> {
    return fromPromise(this.saveAndReturnPromise(key, value));
  }

  private saveAndReturnPromise(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.put(key, value, this.options, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(null);
        }
      });
    });
  }

  get(key: string): Observable<string> {
    return fromPromise(this.readAsPromise(key));
  }

  private readAsPromise(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.get(key, this.options, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.toString());
        }
      });
    });
  }
}
