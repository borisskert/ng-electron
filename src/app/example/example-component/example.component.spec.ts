import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleComponent } from './example.component';
import { FormsModule } from '@angular/forms';
import { AbstractLeveldownProvider } from '../../service/level/abstract-leveldown.provider';
import { LeveldownProvider } from '../../service/level/memdown.provider';
import { ExampleDataService } from '../service/example-data.service';

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
        {
          provide: AbstractLeveldownProvider,
          useClass: LeveldownProvider
        },
        ExampleDataService,
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
