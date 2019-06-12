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

@NgModule({
  declarations: [
    AdminComponent,
    PostComponent,
    PostListComponent,
    UsersComponent,
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
    CommonModule,
    routing,
    SharedModule,
  ]
})
export class AdminModule { }
