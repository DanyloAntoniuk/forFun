import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CrudService } from 'src/app/core/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-content-type-edit',
  templateUrl: './content-type-edit.component.html',
  styleUrls: ['./content-type-edit.component.scss']
})
export class ContentTypeEditComponent implements OnInit {
  form: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

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
    ) { 
      this.form = this.formBuilder.group({
        title: '',
        fields: [],
      });
    }

  // Type coercion for fields array.
  get fields() {
    return this.form.get('fields') as FormArray;
  }

  ngOnInit() {
    this.crudService.getRecord(this.activatedRoute.snapshot.params.title)
      .subscribe((record) => {
        this.form = this.formBuilder.group({
          title: [record.title, Validators.required],
          fields: this.formBuilder.array([]),
        });

        record.fields.forEach(field => {
          this.fields.push(this.formBuilder.group({
            title: [field.title, Validators.required],
            type: [field.type],
          }));
        });
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
    if (!this.form.valid) {
      return;
    }

    const { value } = this.form;

    // Manually set required erorrs for all empty Field Title fields.
    value.fields.forEach((element: { [key: string]: string }, index: number) => {
      if (!element.title) {
        const { controls } = this.fields;

        (controls[index] as FormGroup).controls.title.setErrors({ required: true });
      }
    });

    this.crudService.updateRecord(this.activatedRoute.snapshot.params.title, value)
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray((this.form.controls.fields as any).controls, event.previousIndex, event.currentIndex);
  }
}
