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
  postTitle: string;
  username = localStorage.getItem('username');

  @ViewChild('systemInfoConfigform') systemInfoConfigform: DynamicFormComponent;
  widgetID: string;

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
    this.postTitle = this.activatedRoute.snapshot.params.title;

    this.crudService.getRecord(this.postTitle)
    .subscribe((post: any) => {
      console.log(post);
      this.postTitle = post.title;
      this.widgetID = post.widgets[0].image._id;
      // Config for Dynamic Form.
      this.config = [
        {
          type: 'text',
          name: 'title',
          placeholder: 'Title',
          validation: [ Validators.required ],
          value: post.title,
        },
        {
          type: 'file',
          name: 'image',
          placeholder: 'Upload Image',
          options: (post.widgets) ?
           {
            fileName: post.widgets[0].image.image.originalName,
            fileURL: post.widgets[0].image.image.path,
          } : '',
        },
        {
          type: 'wysiwyg',
          label: 'Body',
          name: 'body',
          value: (post.fields && post.fields.body) ? post.fields.body : '',
        },
        {
          label: 'Save',
          name: 'submit',
          type: 'button',
        },
      ];

      this.systemInfoConfig = [
        {
          type: 'text',
          name: 'author',
          placeholder: 'Author',
          validation: [ Validators.required ],
          value: post.username,
        },
        {
          type: 'date',
          name: 'createdAt',
          placeholder: 'Created At',
          value: post.createdAt,
        },
        {
          type: 'date',
          name: 'updatedAt',
          placeholder: 'Updated At',
          value: post.updatedAt,
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
          value: post.status,
        },
      ];
    });
  }

  submit(data: {[key: string]: string | File}) {
    const systemInfoValues = this.systemInfoConfigform.value;
    systemInfoValues.createdAt = new Date(systemInfoValues.createdAt);
    systemInfoValues.updatedAt = new Date(systemInfoValues.updatedAt);
  
    if (!systemInfoValues.author || !systemInfoValues.createdAt || !systemInfoValues.updatedAt) {
      return;
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
      const formData = new FormData();

      formData.append('image', file);
      formData.append('title', (file as File).name);

      this.widgetsService.updateRecord('images', this.widgetID, formData).subscribe((image: any) => {
        const postWidgetData = {
          ...postData,
          widgets: [
            {
              fieldType: 'Image',
              image: image._id,
            },
          ],
        };

        this.crudService.updateRecord(this.postTitle, postWidgetData).subscribe(() => {
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        });
      });
    } else {
      this.crudService.updateRecord(this.postTitle, postData).subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
      });
    }
  }
}
