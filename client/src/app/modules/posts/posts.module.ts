import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
  ],
  imports: [
    PostsRoutingModule,
    SharedModule,
  ]
})
export class PostsModule { }
