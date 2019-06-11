import { NgModule } from '@angular/core';
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
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MessageComponent } from './components/message/message.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppNavComponent,
    DialogComponent,
    MessageComponent,
    SnackBarComponent,
    DateAgoPipe,
  ],
  imports: [
    MatTableModule,
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
    LayoutModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  entryComponents: [
    DialogComponent,
    SnackBarComponent,
  ],
  exports: [
    MatTableModule,
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
    LayoutModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AppNavComponent,
    DialogComponent,
    MessageComponent,
    SnackBarComponent,
    DateAgoPipe,
  ],
})
export class SharedModule { }
