import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostComponent } from './posts/post/post.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent, 
    children: [
      { path: 'posts', component: PostListComponent },
      { path: 'post/:title', component: PostComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
