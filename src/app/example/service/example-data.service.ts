import { ExampleData } from '../example-data.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class ExampleDataService {
  abstract save(exampleData: ExampleData): Observable<void>;
  abstract read(): Observable<ExampleData>;
}
