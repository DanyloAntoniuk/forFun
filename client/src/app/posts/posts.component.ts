import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { PostsService } from './posts.service';
import { MatPaginator, MatSort } from '@angular/material';
import { Post } from './posts';
import * as moment from 'moment';
import { of as observableOf } from 'rxjs';
import { delay, startWith, switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../login/Auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'posts-table',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [ PostsService, AuthService ],
})
export class PostsComponent implements AfterViewInit {
  posts: Post[];
  displayedColumns: string[] = ['No.','title', 'status', 'createdAt', 'updatedAt'];
  currentUser: User;

  isLoading = true;
  resultsLength = 0;

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private postsService: PostsService, 
    private authService: AuthService,
    private router: Router,
    ) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngAfterViewInit() {
    this.handlePosts();
  }

  handlePosts() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;

          return this.postsService.getPosts(this.paginator.pageIndex + 1).pipe(delay(1000));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoading = false;
          this.resultsLength = data.count;

          return data.posts;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe((posts: Post[]) => {
        const table = posts.map((post: Post) => {
          return {
            ...post,
            createdAt: moment(post.createdAt).format('MMM DD YYYY, HH:mm'),
            updatedAt: moment(post.updatedAt).fromNow(),
          };
        });

        this.posts = table;
      });
  }

  goToPost(element: Post) {
    this.router.navigate(['/post', element.title]);
  }

}
