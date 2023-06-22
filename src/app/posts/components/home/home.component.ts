import { Component } from '@angular/core';
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

public posts$?: Observable<Post[]>;

constructor(
  private postsService : PostsService,
  ){}
ngOnInit(){
  this.loadPosts();
}
loadPosts(){
  this.postsService.getPosts();
  this.posts$ = this.postsService.Posts$;
}
deletePost(id? : number){
  this.postsService.deletePost(id).subscribe((success)=>{
    if(success === true){
      window.alert('delete thành công')
    }else{
      window.alert('delete error')
    }
  })
}
}
