import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/core/auth/auth.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MessageService } from 'src/app/shared/message.service';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from 'src/app/core/errorHandlers/not-found/not-found.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
  ],
  imports: [
    HttpClientModule,
    MatCardModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AuthModule { }
