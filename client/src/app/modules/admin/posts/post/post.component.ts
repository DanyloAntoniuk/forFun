import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../posts';
import { CrudService } from 'src/app/core/crud.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [ CrudService ],
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(
    private postService: CrudService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    const { title } = this.route.snapshot.params;
    this.postService.getRecord(title).subscribe(post => {
      console.log(post);
    });
  }
}
