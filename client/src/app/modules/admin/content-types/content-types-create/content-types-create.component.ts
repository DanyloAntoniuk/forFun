import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-content-types-create',
  templateUrl: './content-types-create.component.html',
  styleUrls: ['./content-types-create.component.scss']
})
export class ContentTypesCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  get fields() {
    return this.form.get('fields') as FormArray;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      fields: this.formBuilder.array([])
    });
  }

  addField() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      type: [''],
    });
  }

  addNext() {
    this.fields.push(this.formBuilder.group(this.addField()));
  }

}
