import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { PostsService } from './posts.service';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { Post } from './posts';
import * as moment from 'moment';
import { merge, Observable, of as observableOf } from 'rxjs';
import { delay, startWith, switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'posts-table',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [ PostsService ],
})
export class PostsComponent implements AfterViewInit {
  posts: Post[];
  displayedColumns: string[] = ['No.','title', 'status', 'createdAt', 'updatedAt'];

  isLoading = true;
  resultsLength = 0;

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private postsService: PostsService) {}

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

}
