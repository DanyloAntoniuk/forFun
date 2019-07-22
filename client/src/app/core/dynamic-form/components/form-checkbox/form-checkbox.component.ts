import { Component, OnInit } from '@angular/core';
import { FormElement } from '../formElement';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss']
})
export class FormCheckboxComponent extends FormElement implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;

  ngOnInit() {
    if (this.config.value) {
      this.group.controls[this.config.name].setValue(this.config.value);
    }
  }

  getError(): string {
    return super.getRequiredError();
  }
}