import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example-component/example.component';
import { FormsModule } from '@angular/forms';
import { ExampleDataService } from './service/example-data.service';

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
    ExampleDataService,
  ]
})
export class ExampleModule {}
