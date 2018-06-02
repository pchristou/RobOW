import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RobowModule } from './robow.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RobowModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
