import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { PostsService } from './posts.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Post } from './posts';
import { of as observableOf, merge } from 'rxjs';
import { delay, startWith, switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../login/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { DialogComponent } from '../components/dialog/dialog.component';

@Component({
  selector: 'posts-table',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [ PostsService, AuthService ],
})
export class PostsComponent implements AfterViewInit {
  posts = new MatTableDataSource<Post>();
  displayedColumns: string[] = ['No.', 'title', 'status', 'createdAt', 'updatedAt', 'actions'];
  currentUser: User;

  isLoading = true;
  resultsLength = 0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    ) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngAfterViewInit() {
    this.handlePosts();
  }

  handlePosts() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

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
        this.posts = new MatTableDataSource(posts);

        this.posts.sortingDataAccessor = sortDate;
        this.posts.sort = this.sort;
    });
  }

  goToPost(element: Post) {
    this.router.navigate(['/post', element.title]);
  }

  deletePost(element: Post) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {
        title: element.title,
        type: 'Post',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postsService.delete(element._id).subscribe(() => {
          this.handlePosts();
        });
      }
    });
  }
}

const sortDate = (item: Post, property: string) => {
  switch (property) {
    case 'updatedAt': {
      return new Date(item.updatedAt);
    }
    case 'createdAt': {
      return new Date(item.createdAt);
    }
    default: return item[property];
  }
};
