import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  { path: 'posts', component: PostListComponent},
  { path: 'post/:title', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
