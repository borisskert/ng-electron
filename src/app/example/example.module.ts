import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example-component/example.component';
import { FormsModule } from '@angular/forms';
import { ExampleDataService } from './service/example-data.service';
import { MyExampleDataService } from './service/browser.example-data.service';
import { ElectronService } from './service/electron.service';

const exampleDataProvider: Provider = {
  provide: ExampleDataService,
  useClass: MyExampleDataService
};

@NgModule({
  declarations: [ ExampleComponent ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ExampleComponent,
  ],
  providers: [
    exampleDataProvider,
    ElectronService,
  ]
})
export class ExampleModule {}
