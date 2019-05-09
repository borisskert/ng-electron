import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractLeveldownProvider {
  public abstract get(name: string);
}
