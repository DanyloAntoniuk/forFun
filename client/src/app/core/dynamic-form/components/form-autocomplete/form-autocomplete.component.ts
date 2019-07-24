import { Component, OnInit } from '@angular/core';
import { FormElement } from '../formElement';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { CrudService } from 'src/app/core/crud.service';
import { tap, switchMap, debounceTime, filter } from 'rxjs/operators';

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
  isLoading = false;

  constructor(private crudService: CrudService) {
    super();
   }

  getError() { 
    return super.getRequiredError();
  }

  ngOnInit() {
    if (this.config.options) {
      this.crudService.getRecord(this.config.value, this.config.options.ref)
      .subscribe((record: any) => {
        this.group.controls[this.config.name].setValue(record);
      });

      this.group.controls[this.config.name].valueChanges
      .pipe(
        debounceTime(350),
        filter((filterValue: string) => {
          return filterValue.length > 2;
        }),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap((value: string) => {
          const httpParams = {
            limit: 5,
            filterValue: value,
          };

          return this.crudService.getRecords(httpParams, this.config.options.ref)
          .pipe(
            tap(() => {
              this.isLoading = false;
            })
          );
        })
      )
      .subscribe((records: any) => {
        this.records = records.data;
      });
    }
  }

  display(element: any) {
    return element.username;
  }
}
