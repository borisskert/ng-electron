import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppComponent } from './app.component';
import { ExampleModule } from './example/example.module';
import { ElectronService } from './service/electron.service';
import { AbstractLeveldownProvider } from './service/level/abstract-leveldown.provider';
import { LeveldownProvider } from './service/level/used-leveldown.provider';

const leveldownProvider: Provider = {
  provide: AbstractLeveldownProvider,
  useClass: LeveldownProvider
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ExampleModule,
  ],
  providers: [
    leveldownProvider,
    ElectronService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
