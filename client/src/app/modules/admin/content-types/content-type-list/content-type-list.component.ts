import { Component } from '@angular/core';

@Component({
  selector: 'app-content-type-list',
  templateUrl: './content-type-list.component.html',
  styleUrls: ['./content-type-list.component.scss']
})
export class ContentTypeListComponent {
  dataTableConfig = {
    displayedColumns: ['title'],
  };
}
