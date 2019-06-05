import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/posts/posts.service';
import { Post } from 'src/app/posts/posts';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [PostsService],
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    const { title } = this.route.snapshot.params;
    this.postService.getPost(title).subscribe(post => {
      console.log(post);
    });
  }
}
