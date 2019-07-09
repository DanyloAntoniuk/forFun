import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FormElement } from '../formElement';

@Component({
  selector: 'app-form-wysiwyg',
  templateUrl: './form-wysiwyg.component.html',
  styleUrls: ['./form-wysiwyg.component.scss']
})
export class FormWysiwygComponent extends FormElement {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;

  getError() {
    return null;
  }
}
