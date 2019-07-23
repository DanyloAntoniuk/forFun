import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { routing } from './app-routing.module';
import { DynamicFormModule } from './core/dynamic-form/dynamic-form.module';
import { TitleService } from './core/title.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './core/auth/jwt.interceptor';
import { AuthInterceptor } from './core/auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routing,
    AuthModule,
    DynamicFormModule,
  ],
  providers: [
    TitleService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
