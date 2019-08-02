import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/core/crud.service';
import { Post } from '../posts';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';
import { WidgetsService } from 'src/app/core/widgets.service';
import { DynamicFormComponent } from 'src/app/core/dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  config: FieldConfig[];
  systemInfoConfig: FieldConfig[];
  post: any;
  username = localStorage.getItem('username');

  @ViewChild('systemInfoConfigform') systemInfoConfigform: DynamicFormComponent;

  constructor(
    private crudService: CrudService,
    private widgetsService: WidgetsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.config = [];
    this.systemInfoConfig = [];
  }

  ngOnInit() {
    this.crudService.getRecord(this.activatedRoute.snapshot.params.title)
    .subscribe((data: any) => {
      console.log(data);
      this.post = data.currentPost;
      // Config for Dynamic Form.
      this.config = [
        {
          type: 'text',
          name: 'title',
          placeholder: 'Title',
          validation: [ Validators.required ],
          value: this.post.title,
        },
        {
          type: 'file',
          name: 'image',
          placeholder: 'Upload Image',
          options: (this.post.widgets) ?
           {
            fileName: this.post.widgets[0].image.image.originalName,
            fileURL: this.post.widgets[0].image.image.path,
          } : '',
        },
        {
          type: 'wysiwyg',
          label: 'Body',
          name: 'body',
          value: (this.post.fields && this.post.fields.body) ? this.post.fields.body : '',
        },
        {
          label: 'Save',
          name: 'submit',
          type: 'button',
        },
      ];

      this.systemInfoConfig = [
        {
          type: 'autocomplete',
          name: 'author',
          placeholder: 'Author',
          validation: [ Validators.required ],
          options: {
            ref: 'users',
          },
          value: this.post.author.username,
        },
        {
          type: 'date',
          name: 'createdAt',
          placeholder: 'Created At',
          value: this.post.createdAt,
        },
        {
          type: 'date',
          name: 'updatedAt',
          placeholder: 'Updated At',
          value: this.post.updatedAt,
        },
        {
          type: 'select',
          name: 'status',
          label: 'Status',
          options: [
            'Published',
            'Unpublished',
            'Archived',
          ],
          value: this.post.status,
        },
      ];
    });
  }

  submit(data: {[key: string]: string | File}) {
    const systemInfoValues = this.systemInfoConfigform.value;
  
    if (!systemInfoValues.author || !systemInfoValues.createdAt || !systemInfoValues.updatedAt) {
      return;
    }

    // If updatedAt field wasn't changed, set its value to curernt date
    if (systemInfoValues.updatedAt === this.post.updatedAt) {
      systemInfoValues.updatedAt = new Date();
    }

    const { file, ...post } = data;
    // Create Post data
    const { title, ...postFields } = post;
    const postData = {
      title,
      fields: { ...postFields },
      ...systemInfoValues,
    };

    // If file input was changed
    if (file) {
      this.crudService.updateRecord(this.post.title, postData).subscribe((post) => {
        const formData = new FormData();

        formData.append('image', file);
        formData.append('title', (file as File).name);
        formData.append('relatedTo', post._id);

        this.widgetsService.updateRecord('images', post.widgets[0].image, formData).subscribe(() => {
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        });
      });
    } else {
      this.crudService.updateRecord(this.post.title, postData).subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
      });
    }
  }
}
