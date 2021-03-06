import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../posts';
import { CrudService } from 'src/app/core/crud.service';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';
import { WidgetsService } from 'src/app/core/widgets.service';
import { DynamicFormComponent } from 'src/app/core/dynamic-form/containers/dynamic-form/dynamic-form.component';

import { MessageService } from 'src/app/shared/message.service';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: Post;
  config: FieldConfig[];
  systemInfoConfig: FieldConfig[];
  username = localStorage.getItem('username');

  @ViewChild('systemInfoConfigForm') systemInfoConfigForm: DynamicFormComponent;

  constructor(
    private crudService: CrudService,
    private widgetsService: WidgetsService,
    private messageService:  MessageService,
    private snackBar: MatSnackBar,
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

    this.systemInfoConfig = [
      {
        type: 'autocomplete',
        name: 'author',
        placeholder: 'Author',
        validation: [ Validators.required ],
        options: {
          ref: 'users',
        },
        value: this.username,
      },
      {
        type: 'date',
        name: 'createdAt',
        placeholder: 'Created At',
        validation: [ Validators.required ],
        value: new Date(),
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
        value: 'Published',
      },
    ];
  }

  submit(data: {[key: string]: string | File}) {
    const systemInfoValues = this.systemInfoConfigForm.value;

    if (!systemInfoValues.author || !systemInfoValues.createdAt) {
      return;
    }

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
        ...systemInfoValues,
      };

      this.crudService.createRecord(postData).subscribe(() => {
        this.snackBar.openFromComponent(SnackBarComponent, {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          data: `${title} was successfully created`,
        });
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      },
      () => {
        this.messageService.error(`Post with title ${title} is already created.`);
      });
    });
  }
}
