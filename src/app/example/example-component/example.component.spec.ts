import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleComponent } from './example.component';
import { ExampleDataService } from '../service/example-data.service';
import { Observable } from 'rxjs';
import { ExampleData } from '../example-data.interface';
import { Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';

class MockedExampleDataService implements ExampleDataService {
  read(): Observable<ExampleData> {
    return Observable.create('');
  }

  save(exampleData: ExampleData): Observable<void> {
    return Observable.create(null);
  }
}

const exampleDataProvider: Provider = {
  provide: ExampleDataService,
  useClass: MockedExampleDataService
};

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [ ExampleComponent ],
      providers: [
        exampleDataProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
