import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/crud.service';
import { Post } from '../posts';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WidgetsService } from 'src/app/core/widgets.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  config: FieldConfig[];

  constructor(
    private crudService: CrudService,
    private widgetsService: WidgetsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.config = [];
  }

  ngOnInit() {
    this.crudService.getRecord(this.activatedRoute.snapshot.params.title)
    .subscribe((post: any) => {
      console.log(post);
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
    });
  }

  submit(data: {[key: string]: string | File}) {
    const { file, ...post } = data;
    // Create Post data
    const { title, ...postFields } = post;
    const postData = {
      title,
      fields: { ...postFields },
      status: 'Published',
    };

    // If file input was changed
    if (file) {
      const formData = new FormData();

      formData.append('image', file);
      formData.append('title', (file as File).name);
  
      this.widgetsService.updateRecord('images', (title as string), formData).subscribe((image: any) => {
        const postWidgetData = {
          ...postData,
          widgets: [
            {
              fieldType: 'Image',
              image: image._id,
            },
          ],
        };
  
        this.crudService.updateRecord((title as string), postWidgetData).subscribe(() => {
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        })
      });
    } else {
      this.crudService.updateRecord((title as string), postData).subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      })
    }
  }
}
