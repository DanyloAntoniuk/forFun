import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';
import { Validators, FormGroup, FormBuilder, FormArray, FormGroupDirective, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CrudService } from 'src/app/core/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content-types-create',
  templateUrl: './content-types-create.component.html',
  styleUrls: ['./content-types-create.component.scss']
})
export class ContentTypesCreateComponent implements OnInit {
  form: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  test = true;

  fieldTypes = [
    { name: 'text', value: 'Text' },
    { name: 'wysiwyg', value: 'Body' },
    { name: 'file', value: 'File' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  // Type coercion for fields array.
  get fields() {
    return this.form.get('fields') as FormArray;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      fields: this.formBuilder.array([
        this.formBuilder.group({
          title: ['Body', Validators.required],
          type: 'wysiwyg',
        })
      ]),
    });
  }

  // Add new field to form.
  addNext() {
    this.fields.push(this.formBuilder.group({
        title: ['', Validators.required],
        type: ['text'],
      })
    );

    // Validation error appears for new fields after form is submitted.
    // Clear validators, so no errors shown for new fields.
    if (this.formGroupDirective.submitted) {
      const { controls } = this.fields;

      controls.forEach((formGroup: FormGroup) => {
        formGroup.controls.title.clearValidators();
      })
    }
  }

  deleteField(index: number) {
    this.fields.removeAt(index);
  }

  submit() {
    const { value } = this.form;

    // Manually set required erorrs for all empty Field Title fields.
    value.fields.forEach((element: { [key: string]: string }, index: number) => {
      if (!element.title) {
        const { controls } = this.fields;

        (controls[index] as FormGroup).controls.title.setErrors({ required: true });
      }
    });

    this.crudService.createRecord(value)
      .subscribe(response => {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute })
      });
  }
}
