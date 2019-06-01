import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { MatTableDataSource } from '@angular/material';
import { Posts } from './posts';

@Component({
  selector: 'posts-table',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [ PostsService ],
})
export class PostsComponent implements OnInit {
  posts: MatTableDataSource<Posts>;
  displayedColumns: string[] = ['title', 'status', 'createdAt', 'updatedAt'];

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.showPosts();
  }

  showPosts() {
    this.postsService.getPosts()
    .subscribe((data: any) => {
      console.log(data);
      this.posts = new MatTableDataSource(data);
    });
  }

}
