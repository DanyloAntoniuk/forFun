import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../posts';
import { CrudService } from 'src/app/core/crud.service';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';
import { forkJoin } from 'rxjs';
import { WidgetsService } from 'src/app/core/widgets.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: Post;
  config: FieldConfig[];

  constructor(
    private crudService: CrudService,
    private widgetsService: WidgetsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Config for Dynamic Form.
    this.config = [
      {
        type: 'text',
        name: 'title',
        placeholder: 'Title',
        validation: [ Validators.required ],
      },
      {
        type: 'file',
        name: 'image',
        placeholder: 'Upload Image',
        validation: [ Validators.required ]
      },
      {
        type: 'wysiwyg',
        label: 'Body',
        name: 'body',
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

  submit(data: {[key: string]: string | File}) {
    const { file, ...post } = data;
    // Create Post data
    const { title, ...postFields } = post;

    const formData = new FormData();

    formData.append('image', file);
    formData.append('title', (file as File).name);

    this.widgetsService.createRecord('images', formData).subscribe((image: any) => {
      const postData = {
        title,
        fields: { ...postFields },
        widgets: [
          {
            fieldType: 'Image',
            image: image._id,
          },
        ],
        status: 'Published',
      };

      this.crudService.createRecord(postData).subscribe((post) => {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      });
    });
  }
}
