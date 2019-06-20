import { Component, ViewContainerRef, OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'app-form-input',
  styleUrls: ['form-input.component.scss'],
  templateUrl: 'form-input.component.html',
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;
}