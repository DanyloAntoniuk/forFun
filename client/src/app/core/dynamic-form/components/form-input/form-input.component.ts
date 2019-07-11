import { Component, ViewContainerRef, OnInit, AfterViewChecked, AfterContentInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormElement } from '../formElement';

@Component({
  selector: 'app-form-input',
  styleUrls: ['form-input.component.scss'],
  templateUrl: 'form-input.component.html',
})
export class FormInputComponent extends FormElement implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;

  ngOnInit() {
    if (this.config.value) {
      this.group.controls[this.config.name].setValue(this.config.value);
    }
  }

  getError() {
    return super.getRequiredError();
  }
}
