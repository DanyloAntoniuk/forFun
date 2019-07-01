import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { routing } from './app-routing.module';
import { DynamicFormModule } from './core/dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    AuthModule,
    DynamicFormModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
