import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';
import { FormGroup, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AfterViewInit } from '@angular/core';

// Generic class for Dynamic form fields.
export abstract class FormElement implements Field, AfterViewInit {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;
  errorStateMatcher: ErrorStateMatcher;

  constructor() {
    // Init with default ErrorStateMatcher.
    this.errorStateMatcher = new ErrorStateMatcher();
  }

  // Return form field error.
  get errors() {
    return this.group.controls[this.config.name].errors;
  }

  // Returns form field value.
  get value(): string {
    return this.group.value[this.config.name];
  }

  // Returns form field label.
  get label(): string {
    if (this.config.label) {
      return this.config.label;
    }

    // Replace all dashes with spaces in label.
    const label = this.config.name.replace(/-/g, ' ');
    // Make it title case.
    const capitalizedFieldName = label.charAt(0).toUpperCase() + label.slice(1);

    return capitalizedFieldName;
  }

  ngAfterViewInit() {
    // When using dynamic form, child FormGroupDirective does't track if form was submitted,
    // the value of submitted property is always false and no errors are shown after user submits the form.
    // Need to pass parent FormGroupDirective to custom ErrorStateMatcher for proper form validation.
    this.errorStateMatcher = new DynamicErrorStateMatcher(this.formGroupDirective);
  }

  // Returns error message for required field.
  getRequiredError(): string {
    if (this.errors && this.errors.required) {
      return `${this.label} field is required.`;
    }
  }

  // Returns current form field error.
  abstract getError(): string;
}
// Custom ErrorStateMatcher with FormGroupDirective from parent component.
class DynamicErrorStateMatcher implements ErrorStateMatcher {
  constructor(private formGroupDirective: FormGroupDirective) { }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (this.formGroupDirective) {
      // Check if form is submitted.
      const isSubmitted = this.formGroupDirective.submitted;

      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }

    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
