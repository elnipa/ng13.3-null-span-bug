import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProblemModule } from './collection/problem.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ProblemModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
