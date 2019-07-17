import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../posts';
import { CrudService } from 'src/app/core/crud.service';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [ CrudService ],
})
export class PostComponent implements OnInit {
  post: Post;
  config: FieldConfig[];

  constructor(
    private crudService: CrudService,
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
    const postData = {
      title,
      fields: { ...postFields },
      status: 'Published',
    };

    const formData = new FormData();

    formData.append('image', file);
    formData.append('title', (file as File).name);

    const imagObservable = this.crudService.createRecord(formData, 'http://localhost:3001/api/widgets/images');
    const postObservable = this.crudService.createRecord(postData);

    forkJoin(imagObservable, postObservable).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    })
  }
}
