import { Injectable } from '@angular/core';
import { ExampleDataService } from './example-data.service';
import { ExampleData } from '../example-data.interface';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class MyExampleDataService implements ExampleDataService {
  private readonly key = 'ng-electron/example-data';

  constructor(private readonly localStorage: LocalStorageService) {}

  save(exampleData: ExampleData): Observable<void> {
    this.localStorage.setObject(this.key, exampleData);
    return Observable.create(null);
  }

  read(): Observable<ExampleData> {
    const readObject = this.localStorage.getObject<ExampleData>(this.key);

    if (readObject) {
      return of<ExampleData>(readObject);
    }

    return of<ExampleData>({ content: '' });
  }
}
