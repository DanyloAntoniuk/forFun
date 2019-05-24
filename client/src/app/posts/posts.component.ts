import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';

@Component({
  selector: 'posts-table',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [ PostsService ],
})
export class PostsComponent implements OnInit {
  posts: Object = {};
  displayedColumns: string[] = ['title', 'status', 'author', 'createdAt', 'updatedAt'];

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.showTestData();
  }

  showTestData() {
    this.postsService.getPosts()
    .subscribe((data: any) => {
      console.log(data);
      this.posts = data.posts;
    })
  }
}
