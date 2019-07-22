import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FormElement } from '../formElement';

@Component({
  selector: 'app-form-date-picker',
  templateUrl: './form-date-picker.component.html',
  styleUrls: ['./form-date-picker.component.scss']
})
export class FormDatePickerComponent extends FormElement implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;

  ngOnInit() {
    if (this.config.value) {
      this.group.controls[this.config.name].setValue(this.config.value);
    }
  }

  getError(): string {
    if (this.errors && this.errors.matDatepickerParse) {
      return 'Provided date is not a valid date';
    }

    return super.getRequiredError();
  }
}
