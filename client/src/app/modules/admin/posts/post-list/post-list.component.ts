import { Component } from '@angular/core';

@Component({
  selector: 'app-posts-table',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  // Config for Data table.
  dataTableConfig = {
    displayedColumns: ['title', 'status'],
  };
}
