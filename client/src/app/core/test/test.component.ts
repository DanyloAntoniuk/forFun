import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(4)],
      //errorStateMatcher: new EmailErrorStateMatcher(),
    },
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      placeholder: 'Enter your email',
      validation: [Validators.required, Validators.email],
      //errorStateMatcher: new EmailErrorStateMatcher(),
    },
    {
      type: 'password',
      // label: 'Favourite Food',
      name: 'password',
      placeholder: 'Password',
      validation: [Validators.required, Validators.minLength(6)],
    },
    {
      type: 'confirmPassword',
      // label: 'Favourite Food',
      name: 'confirm-password',
      placeholder: 'Confirm password',
      validation: [Validators.required],
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ];
  ngOnInit() {
  }

  submit(value: {[name: string]: any}) {
    //this.config[0].errorStateMatcher = new EmailErrorStateMatcher(this.formGroupDirective);
  }
}