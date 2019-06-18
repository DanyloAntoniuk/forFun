import { Component, AfterViewInit } from '@angular/core';
import { DataTableConfig } from 'src/app/shared/data-table/data-table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-table',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements AfterViewInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    console.log(router, activatedRoute);
  }
  dataTableConfig = {
    displayedColumns: ['title', 'status'],
  };

  ngAfterViewInit() {}
}
