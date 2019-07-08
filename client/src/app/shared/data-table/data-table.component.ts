import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../components/dialog/dialog.component';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter, startWith, switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { CrudService } from 'src/app/core/crud.service';
import { DataTableConfig } from './data-table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [CrudService]
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @Input() dataTableConfig: DataTableConfig;

  data: MatTableDataSource<any>;
  displayedColumns: string[];
  selection = new SelectionModel<any>(true, []);
  isEmptyTable = false;
  isLoading = true;
  resultsLength = 0;
  pages = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private dataService: CrudService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {
    // this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
    // Combine dipslayed columns with required columns.
    this.displayedColumns = ['select', 'No.', ...this.dataTableConfig.displayedColumns, 'createdAt', 'updatedAt', 'actions'];
  }

  ngAfterViewInit() {
    this.handleData();
  }

  // Check if all rows in table are selected.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.data.length;

    return numSelected === numRows;
  }

  // Toggle selection.
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.data.forEach(row => this.selection.select(row));
  }

  // Delete selected records.
  deleteMany() {
    const ids = this.selection.selected.map((data: any) => data._id);

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      position: { top: '20%' },
      data: `Do you realy wont to delete ${ids.length} ${this.selection.selected.length > 1 ? 'records' : 'record'}`,
    });

    dialogRef.afterClosed().subscribe(accepted => {
      if (accepted) {
        this.dataService.deleteManyRecords(ids).subscribe(() => {
          this.handleData();

          this.snackBar.openFromComponent(SnackBarComponent, {
            data: `${ids.length} ${this.selection.selected.length > 1 ? 'records' : 'record'} was deleted`,
          });

          this.selection.clear();
        });
      }
    });
  }

  // Load and create datatable source.
  handleData() {
    // Search filter.
    const filterObservable = fromEvent(this.filter.nativeElement, 'keyup')
    .pipe(
      // To prevent multiple requests, start after 350ms and more than 2 characters typed.
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

    // Move to first page after sort order or filter criteria changed.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    filterObservable.subscribe(() => this.paginator.pageIndex = 0);

    merge(filterObservable, matTableObservables)
      .pipe(
        switchMap(() => {
          // Show loading indicator.
          this.isEmptyTable = false;
          this.isLoading = true;

          // Query params for sorting, pagination and filtering on server side.
          const httpParams = {
            limit: this.paginator.pageSize,
            page: this.paginator.pageIndex + 1,
            sortField: this.sort.active ? this.sort.active : '',
            sortDirection: this.sort.direction ? this.sort.direction : '',
            filterValue: this.filter.nativeElement.value,
          };

          return this.dataService.getRecords(httpParams);
        }),
        map((response) => {
          this.isLoading = false;

          // Show 'no records' if empty table.
          if (!response.count) {
            this.isEmptyTable = true;

            return [];
          }

          this.resultsLength = response.count;

          // Number of pages based on current page size
          const numberOfPages = Math.ceil(this.resultsLength / this.paginator.pageSize);
          // Array from 1 to number of pages to iterate through in select list.
          this.pages = Array(numberOfPages).fill(0).map((value, i) => i + 1);

          return response.data;
        }),
        catchError((err: HttpErrorResponse) => {
          this.isLoading = false;

          if (err.status === 404) {
            this.isEmptyTable = true;
          }

          return [];
        })
      )
      .subscribe((records) => {
        this.data = new MatTableDataSource(records);

        this.data.sort = this.sort;
      });
  }

  // Change page number of table.
  handleChange(value: number) {
    this.paginator.pageIndex = value - 1;

    this.handleData();
  }

  // Delete one record.
  deleteRecord(element) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      position: { top: '20%' },
      data: `Do you realy wont to delete ${element.title}`,
    });

    dialogRef.afterClosed().subscribe(accepted => {
      if (accepted) {
        this.dataService.deleteRecord(element._id, 'post').subscribe(() => {
          this.handleData();

          // If only 1 record on a page, wait until paginator changes its length
          // and then show previous page
          // @TODO find a better way without duplicate requests.
          setTimeout(() =>  {
            if (this.paginator.length % this.paginator.pageSize === 0) {
              this.paginator.pageIndex -= 1;

              this.handleData();
            }
          });

          this.snackBar.openFromComponent(SnackBarComponent, {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            data: `${element.title} was deleted`,
          });
        });
      }
    });
  }

  clearFilter() {
    // Copy filter input value.
    const filterValue = this.filter.nativeElement.value;
    this.filter.nativeElement.value = '';

    if (filterValue.length > 2) {
      this.handleData();
    }
  }

  // Go to create record page.
  goToAddRecord() {
    this.router.navigate(['./add'])
  }
}
