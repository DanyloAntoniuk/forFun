import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { routing } from './auth-routing.module';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/core/auth/auth.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [
    LoginComponent,
  ]
})
export class AuthModule { }
