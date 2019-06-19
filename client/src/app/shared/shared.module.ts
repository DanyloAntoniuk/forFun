import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatSortModule,
  MatCheckboxModule,
} from '@angular/material';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MessageComponent } from './components/message/message.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { AuthService } from '../core/auth/auth.service';
import { CrudService } from '../core/crud.service';
import { FormInputComponent } from './components/form-elements/form-input/form-input.component';

@NgModule({
  declarations: [
    AppNavComponent,
    DialogComponent,
    MessageComponent,
    SnackBarComponent,
    DateAgoPipe,
    DataTableComponent,
    FormInputComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    FlexLayoutModule,
    RouterModule,
  ],
  entryComponents: [
    DialogComponent,
    SnackBarComponent,
  ],
  providers: [
    AuthService,
  ],
  exports: [
    AppNavComponent,
    DialogComponent,
    MessageComponent,
    SnackBarComponent,
    DateAgoPipe,
    DataTableComponent,
  ],
})
export class SharedModule { }
