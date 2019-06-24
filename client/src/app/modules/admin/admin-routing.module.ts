import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostComponent } from './posts/post/post.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from '../auth/auth.guard';
import { PostEditComponent } from './posts/post-edit/post-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'posts',
        children: [
          {
            path: '',
            component: PostListComponent,
          },
          {
            path: ':title',
            component: PostComponent,
          },
          {
            path: 'edit/:title',
            component: PostEditComponent,
          },
        ]
      },
      {
        path: 'users',
        component: UsersComponent,
        //canLoad: [AuthGuard],
      },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
