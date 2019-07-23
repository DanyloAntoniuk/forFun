import { Component, OnInit } from '@angular/core';
import { FormElement } from '../formElement';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { CrudService } from 'src/app/core/crud.service';

@Component({
  selector: 'app-form-autocomplete',
  templateUrl: './form-autocomplete.component.html',
  styleUrls: ['./form-autocomplete.component.scss']
})
export class FormAutocompleteComponent extends FormElement implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;
  records: any[];

  constructor(private crudService: CrudService) {
    super();
   }

  getError() { 
    return super.getRequiredError();
  }

  ngOnInit() {
    if (this.config.options) {
      const httpParams = {
        // limit: 5,
        // page: this.paginator.pageIndex + 1,
        // sortField: this.sort.active ? this.sort.active : '',
        // sortDirection: this.sort.direction ? this.sort.direction : '',
        // filterValue: this.config.value,
      };

      this.crudService.getRecords(httpParams, this.config.options.ref).subscribe(users => {
        this.records = users.data;
      });
    }
  }

}
