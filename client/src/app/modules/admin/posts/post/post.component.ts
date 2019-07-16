import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../posts';
import { CrudService } from 'src/app/core/crud.service';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [ CrudService ],
})
export class PostComponent implements OnInit {
  post: Post;
  config: FieldConfig[];

  constructor() { }

  ngOnInit() {
    // Config for Dynamic Form.
    this.config = [
      {
        type: 'text',
        name: 'title',
        placeholder: 'Title',
        validation: [ Validators.required ],
        value: 'test',
      },
      {
        type: 'file',
        name: 'image',
        placeholder: 'Upload Image',
        validation: [Validators.required]
      },
      {
        type: 'wysiwyg',
        label: 'Body',
        name: 'body',
        value: '<h1>test</h1>',
        options: {
          placeholderText: 'Start typing here...',
          toolbarButtons: [
            'html',
          ],
        },
      },
      {
        label: 'Save',
        name: 'submit',
        type: 'button',
      },
    ];
  }

  submit(e) {
    console.log(e);
  }
}
