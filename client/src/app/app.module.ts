import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule, 
  MatToolbarModule, 
  MatButtonModule, 
  MatSidenavModule, 
  MatIconModule, 
  MatListModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSortModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatSelectModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { from } from 'rxjs';
import { AppNavComponent } from './shared/app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AuthService } from './login/auth.service';
import { MessageComponent } from './components/message/message.component';
import { PostComponent } from './components/post/post.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { DialogComponent } from './components/dialog/dialog.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    AppNavComponent,
    LoginComponent,
    MessageComponent,
    PostComponent,
    DateAgoPipe,
    DialogComponent,
    SnackBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  entryComponents: [
    DialogComponent,
    SnackBarComponent,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
