import { NgModule } from '@angular/core';
import { routing } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PostComponent } from './posts/post/post.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    PostComponent,
    PostListComponent,
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
  ]
})
export class AdminModule { }
