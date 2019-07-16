import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/core/crud.service';
import { Post } from '../posts';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  config: FieldConfig[];

  constructor(
    private crudService: CrudService,
    private activatredRoute: ActivatedRoute,
  ) {
    this.config = [];
  }

  ngOnInit() {
    this.crudService.getRecord(this.activatredRoute.snapshot.params.title)
    .subscribe((post: Post) => {
      console.log(post);
      // Config for Dynamic Form.
      this.config = [
        {
          type: 'text',
          name: 'title',
          placeholder: 'Title',
          validation: [Validators.required],
          value: post.title,
        },
        {
          type: 'file',
          name: 'image',
          placeholder: 'Upload Image',
        },
        {
          type: 'wysiwyg',
          label: 'Body',
          name: 'body',
          // value: '<h1>tes</h1>',
        },
        {
          label: 'Save',
          name: 'submit',
          type: 'button',
        },
      ];
    });
  }

  submit(e) {
    console.log(e);
  }
}
