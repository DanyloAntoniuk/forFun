import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { PostsService } from '../posts.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Post, PostApi } from '../posts';
import { merge, of as observableOf, fromEvent } from 'rxjs';
import { startWith, switchMap, map, catchError, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { SnackBarComponent } from '../../../../shared/components/snack-bar/snack-bar.component';
import { HttpErrorResponse } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/auth/user';

@Component({
  selector: 'posts-table',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: [ PostsService, AuthService ],
})
export class PostListComponent implements AfterViewInit {
  currentUser: User;

  posts = new MatTableDataSource<Post>();
  displayedColumns: string[] = ['select', 'No.', 'title', 'status', 'createdAt', 'updatedAt', 'actions'];
  selection = new SelectionModel<Post>(true, []);
  emptyTable = false;
  isLoading = true;
  resultsLength = 0;
  pages = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngAfterViewInit() {
    this.handlePosts();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.posts.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.posts.data.forEach(row => this.selection.select(row));
  }

  deleteMany() {
    const ids = this.selection.selected.map((post: Post) => post._id);

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      position: { top: '20%' },
      data: `Do you realy wont to delete ${ids.length} ${this.selection.selected.length > 1 ? 'records' : 'record'}`,
    });

    dialogRef.afterClosed().subscribe(accepted => {
      if (accepted) {
       this.postsService.deleteManyPosts(ids).subscribe(() => {
          this.selection.clear();
          this.handlePosts();

          const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
            data: `${ids.length} ${this.selection.selected.length > 1 ? 'records' : 'record'} was deleted`,
          });

          // snackBarRef.afterDismissed().subscribe((dismissedByAction) => {
          //   if (dismissedByAction) {
          //     this.postsService.createPost(element).subscribe(() => {
          //       this.handlePosts();
          //     });
          //   }
          // });
        });
      }
    });

  }

  handlePosts() {
    const filterObservable = fromEvent(this.filter.nativeElement, 'keyup')
    .pipe(
      debounceTime(350),
      map((event: any) => event.target.value),
      filter(filterValue => {
        return filterValue.length > 2 || filterValue.length === 0;
      }),
      distinctUntilChanged()
    );

    const matTableObservables = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({})
      );

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    filterObservable.subscribe(() => this.paginator.pageIndex = 0);

    merge(filterObservable, matTableObservables)
      .pipe(
        switchMap(() => {
          this.emptyTable = false;
          this.isLoading = true;

          const httpParams = {
            limit: this.paginator.pageSize,
            page: this.paginator.pageIndex + 1,
            sortField: this.sort.active ? this.sort.active : '',
            sortDirection: this.sort.direction ? this.sort.direction : '',
            filterValue: this.filter.nativeElement.value,
          };

          return this.postsService.getPosts(httpParams);
        }),
        map((data: PostApi) => {
          this.isLoading = false;

          if (!data.count) {
            this.emptyTable = true;

            return [];
          }

          this.resultsLength = data.count;

          const numberOfPages = Math.ceil(this.resultsLength / this.paginator.pageSize);
          this.pages = Array(numberOfPages).fill(0).map((value, i) => i + 1);

          return data.posts;
        }),
        catchError((err: HttpErrorResponse) => {
          this.isLoading = false;

          if (err.status === 404) {
            this.emptyTable = true;
          }

          return [];
        })
      )
      .subscribe((posts) => {
        this.posts = new MatTableDataSource(posts);

        this.posts.sort = this.sort;
      });
  }

  handleChange(value: number) {
    this.paginator.pageIndex = value - 1;

    this.handlePosts();
  }

  goToPost(element: Post) {
    this.router.navigate(['/post', element.title]);
  }

  deletePost(element: Post) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      position: { top: '20%' },
      data: `Do you realy wont to delete Post ${element.title}`,
    });

    dialogRef.afterClosed().subscribe(accepted => {
      if (accepted) {
          const posts = this.posts.data.filter(post => post._id !== element._id);

          this.posts = new MatTableDataSource(posts);

          if (this.paginator.length % this.paginator.pageSize === 0) {
            this.resultsLength -= 1;
            this.pages.pop();
          }

        // this.postsService.deletePost(element._id).subscribe(() => {
        //   this.handlePosts();
        //   setTimeout(() =>  {
        //     if (this.paginator.length % this.paginator.pageSize === 0) {
        //       this.paginator.pageIndex -= 1;

        //       this.handlePosts();
        //     }
        //   });

        //   const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
        //     data: `${element.title} was deleted`,
        //   });

        //   snackBarRef.afterDismissed().subscribe((dismissedByAction) => {
        //     if (dismissedByAction) {
        //       this.postsService.createPost(element).subscribe(() => {
        //         this.handlePosts();

        //         setTimeout(() =>  {
        //           if (this.paginator.length % this.paginator.pageSize === 0) {
        //             this.paginator.pageIndex += 1;

        //             this.handlePosts();
        //           }
        //         });
        //       });
        //     }
        //   });
        // });
      }
    });
  }
}
