import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  post$?: Observable<Post | undefined>;
  constructor(
    private postService : PostsService,
    private route: ActivatedRoute){}
  goBack(){
    this.postService.goBack();
  }
  ngOnInit(){
    this.loadPost();
  }
  loadPost():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.post$ = this.postService.Posts$.pipe(
      map(posts => posts.find(post => post.id === id)))
  }
}
