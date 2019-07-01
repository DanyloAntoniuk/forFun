import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  // Config for Data table.
  dataTableConfig = {
    displayedColumns: ['role', 'active', 'method'],
  };
}
