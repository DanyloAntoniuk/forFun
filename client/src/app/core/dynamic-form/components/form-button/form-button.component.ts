import { Component } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'app-form-button',
  styleUrls: ['form-button.component.scss'],
  templateUrl: 'form-button.component.html',
})
export class FormButtonComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;
}
