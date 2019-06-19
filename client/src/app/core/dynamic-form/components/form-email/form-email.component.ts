import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormArrayName } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'app-form-email',
  templateUrl: './form-email.component.html',
  styleUrls: ['./form-email.component.scss']
})
export class FormEmailComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;
  emailErrorStateMatcher;

  ngOnInit() {
    this.emailErrorStateMatcher = new EmailErrorStateMatcher(this.formGroupDirective);
  }
}

export class EmailErrorStateMatcher implements ErrorStateMatcher {
  constructor(private test?: {}) {}
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null) {
    if (this.test) {
      const isSubmitted = this.test.submitted;

      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }
}
