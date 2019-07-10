import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ElementRef, ContentChildren, ContentChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';
import { FormFileUploadComponent } from '../../components/form-file-upload/form-file-upload.component';
import { DynamicFieldDirective } from '../../components/dynamic-field/dynamic-field.directive';

@Component({
  selector: 'app-dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  templateUrl: 'dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @ViewChild('dynamicForm') dynamicForm: ElementRef;

  @Input()
  config: FieldConfig[] = [];

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get controls() { 
    return this.config.filter(({type}) => type !== 'button'); 
  }
  // get changes() { return this.form.valueChanges; }
  // get valid() { return this.form.valid; }
  get value() { 
    return this.form.value; 
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.createGroup();
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });

    }
  }

  // Create form group with fields from config.
  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));

    return group;
  }

  // Create form field with attributes from config.
  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;

    return this.fb.control({ disabled, value }, validation);
  }

  // Pass submit event to child components.
  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    // Find input file element within form
    for(const element of this.dynamicForm.nativeElement.elements) {
      if (element.type === 'file') {
        const file = element.files[0];
        // Find form control name for input file form field
        let fileInputControlName = this.config.filter((el) => el.type === 'file')[0].name;

        // Remove input file filed from form values
        const { [fileInputControlName]: deletedKey, ...values } = this.value;
        // And pass file as input file field value.
        this.submit.emit({...values, file})
        return;
      }
    }
    

    if (this.form.invalid) {
      return;
    }

    this.submit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    // this.config = this.config.map((item) => {
    //   if (item.name === name) {
    //     item.disabled = disable;
    //   }
    //   return item;
    // });
  }

  // setValue(name: string, value: any) {
  //   this.form.controls[name].setValue(value, {emitEvent: true});
  // }
}
