import { NgModule } from '@angular/core';
import { routing } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PostComponent } from './posts/post/post.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import {
  MatProgressSpinnerModule,
  MatCardModule,
  MatCheckboxModule,
  MatTableModule,
  MatIconModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatButtonModule,
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard } from '../auth/auth.guard';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { CrudService } from 'src/app/core/crud.service';
import { ContentTypeListComponent } from './content-types/content-type-list/content-type-list.component';
import { ContentTypesCreateComponent } from './content-types/content-types-create/content-types-create.component';
import { DynamicFormModule } from 'src/app/core/dynamic-form/dynamic-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentTypeEditComponent } from './content-types/content-type-edit/content-type-edit.component';
import { DynamicContentTypeComponent } from './content-types/dynamic-content-type/dynamic-content-type.component';
import { WidgetsService } from 'src/app/core/widgets.service';

@NgModule({
  declarations: [
    AdminComponent,
    PostComponent,
    PostListComponent,
    UsersComponent,
    PostEditComponent,
    ContentTypeListComponent,
    ContentTypesCreateComponent,
    ContentTypeEditComponent,
    DynamicContentTypeComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatTableModule,
    FlexLayoutModule,
    CommonModule,
    routing,
    SharedModule,
    ReactiveFormsModule,
    DynamicFormModule,
    DragDropModule,
  ],
  entryComponents: [
    DynamicContentTypeComponent,
  ],
  providers: [
    AuthGuard,
    CrudService,
    WidgetsService,
  ]
})
export class AdminModule { }
