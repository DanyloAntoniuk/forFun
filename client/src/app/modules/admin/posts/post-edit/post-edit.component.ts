import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/core/crud.service';
import { Post } from '../posts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements AfterViewInit {
  post: Post;

  constructor(
    private crudService: CrudService,
    private activatredRoute: ActivatedRoute,
  ) { }

  ngAfterViewInit() {
    this.crudService.getRecord(this.activatredRoute.snapshot.params.title)
      .subscribe((post) => this.post = post);
    console.log(this.activatredRoute);
  }

}
