import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../posts';
import { CrudService } from 'src/app/core/crud.service';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [ CrudService ],
})
export class PostComponent implements OnInit {
  post: Post;
  config;

  constructor(
    private postService: CrudService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    // Config for Dynamic Form.
    this.config = [
      {
        type: 'text',
        name: 'title',
        placeholder: 'Title',
        validation: [Validators.required],
      },
      {
        type: 'wysiwyg',
        label: 'Body',
        name: 'body',
        options: {
          placeholderText: 'Start typing here...',
        }
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
