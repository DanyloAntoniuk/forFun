import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/crud.service';
import { Post } from '../posts';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  config: FieldConfig[];

  constructor(
    private crudService: CrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.config = [];
  }

  ngOnInit() {
    this.crudService.getRecord(this.activatedRoute.snapshot.params.title)
    .subscribe((post: Post) => {
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
        },
        {
          type: 'wysiwyg',
          label: 'Body',
          name: 'body',
          value: post.fields.body,
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

    const formData = new FormData();

    formData.append('image', file);
    formData.append('title', (file as File).name);

    const imageObservable = this.crudService.updateRecord((title as string), formData, 'http://localhost:3001/api/widgets/images');
    const postObservable = this.crudService.updateRecord((title as string), postData);

    forkJoin(imageObservable, postObservable).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    })
  }
}
