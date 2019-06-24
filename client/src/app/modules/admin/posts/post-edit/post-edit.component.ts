import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/core/crud.service';
import { Post } from '../posts';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  post: Post;
  config;

  constructor(
    private crudService: CrudService,
    private activatredRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.crudService.getRecord(this.activatredRoute.snapshot.params.title)
      .subscribe((post: Post) => {
        this.post = post;

        const fieldsToRemove = ['_id', '__v', 'fields', 'widgets'];
        const fields = Object.keys(post).filter(field => !fieldsToRemove.includes(field));

        this.config = fields.map((field) => {
          return {
            type: 'input',
            label: '',
            name: 'email',
            placeholder: 'Enter your email',
            validation: [Validators.required, Validators.email],
          };
        });
        console.log(post);
      });
  }

}
