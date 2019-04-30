import { Injectable } from '@angular/core';
import { ExampleDataService } from './example-data.service';
import { Observable } from 'rxjs';
import { ExampleData } from '../example-data.interface';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ElectronService } from './electron.service';


@Injectable()
export class MyExampleDataService implements ExampleDataService {

  private filesystem;

  constructor(private readonly electron: ElectronService) {}

  read(): Observable<ExampleData> {
    return fromPromise(this.readAsPromise());
  }

  save(exampleData: ExampleData): Observable<void> {
    return fromPromise(this.saveAndReturnPromise(exampleData));
  }

  private readAsPromise(): Promise<ExampleData> {
    return new Promise((resolve, reject) => {
      this.fs.readFile(this.filepath, 'utf-8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve({ content: data });
        }
      });
    });
  }

  private saveAndReturnPromise(exampleData: ExampleData): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fs.writeFile(this.filepath, exampleData.content, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(null);
        }
      });
    });
  }

  private get filepath(): string {
    return `${this.electron.remote.app.getPath('userData')}/example-data.txt`;
  }

  private get fs() {
    if (this.filesystem) {
      return this.filesystem;
    }

    this.filesystem = this.createFs();
    return this.filesystem;
  }

  private createFs() {
    return this.electron.remote.require('fs');
  }
}
