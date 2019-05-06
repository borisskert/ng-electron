import { ExampleData } from '../example-data.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LevelService } from '../../service/level/level.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ExampleDataService {

  constructor(private readonly levelService: LevelService) {}

  public save(exampleData: ExampleData): Observable<void> {
    return this.levelService.put('example-data', exampleData.content);
  }

  public read(): Observable<ExampleData> {
    return this.levelService.get('example-data').pipe(
      map(value => ({ content: value }))
    );
  }
}
