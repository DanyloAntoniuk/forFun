import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FormElement } from '../formElement';

@Component({
  selector: 'app-form-wysiwyg',
  templateUrl: './form-wysiwyg.component.html',
  styleUrls: ['./form-wysiwyg.component.scss']
})
export class FormWysiwygComponent extends FormElement implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;

  ngOnInit() {
    if (this.config.value) {
      this.group.controls[this.config.name].setValue(this.config.value);
    }
  }

  getError() {
    return null;
  }
}
