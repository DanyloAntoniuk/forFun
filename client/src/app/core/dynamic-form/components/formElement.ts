import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';
import { FormGroup, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';

export abstract class FormElement implements Field, AfterViewInit {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;
  errorStateMatcher: ErrorStateMatcher;

  constructor() {
    this.errorStateMatcher = new ErrorStateMatcher();
  }

  get errors() {
    return this.group.controls[this.config.name].errors;
  }

  get value(): string {
    return this.group.value[this.config.name];
  }

  get label(): string {
    if (this.config.label) {
      return this.config.label;
    }

    const label = this.config.name.replace(/-/g, ' ');
    const capitalizedFieldName = label.charAt(0).toUpperCase() + label.slice(1);

    return capitalizedFieldName;
  }

  ngAfterViewInit() {
    this.errorStateMatcher = new DynamicErrorStateMatcher(this.formGroupDirective);
  }

  getRequiredError(): string {
    if (this.errors && this.errors.required) {
      return `${this.label} field is required.`;
    }
  }

  abstract getError(): string;
}

class DynamicErrorStateMatcher implements ErrorStateMatcher {
  constructor(private formGroupDirective: FormGroupDirective) { }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (this.formGroupDirective) {
      const isSubmitted = this.formGroupDirective.submitted;

      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }

    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
