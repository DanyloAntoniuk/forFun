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
      errorStateMatcher: new EmailErrorStateMatcher(),
    },
    // {
    //   type: 'select',
    //   label: 'Favourite Food',
    //   name: 'food',
    //   options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
    //   placeholder: 'Select an option',
    //   validation: [Validators.required]
    // },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ];
  ngOnInit() {
  }

  submit(value: {[name: string]: any}) {
    this.config[0].errorStateMatcher = new EmailErrorStateMatcher(this.formGroupDirective);
  }
}

class EmailErrorStateMatcher implements ErrorStateMatcher {
  constructor(private test?: {}) {}
  isErrorState(control: FormControl | null, form: NgForm) {
    console.log(this.test, form);
    
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}