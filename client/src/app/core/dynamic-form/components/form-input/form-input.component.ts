import { Component, ViewContainerRef, OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.scss'],
  template: `
    <div 
      class="dynamic-field form-input" 
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <mat-form-field>
        <input matInput
          type="text"
          [placeholder]="config.placeholder"
          [errorStateMatcher]="config.errorStateMatcher"
          [formControlName]="config.name"
        >
        <mat-error *ngIf="!valid">dasdas</mat-error>
      </mat-form-field>
    </div>
  `
})
export class FormInputComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;

  ngOnInit() {}
}
