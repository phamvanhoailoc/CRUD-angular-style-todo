import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { FormBuilder } from '@angular/forms';
import { Observable, filter, map, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent {
  post$?: Observable<Post | undefined>;
  constructor(
    private postService: PostsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  formPost = this.formBuilder.group({
    title: '',
    body: '',
  });
  ngOnInit() {
    this.loadPost();
  }

  addPost() {
    const data = {
      title: this.formPost.get('title')?.value?.trim() ?? '',
      body: this.formPost.get('body')?.value?.trim() ?? '',
    };
    const post = new Post(undefined, data.title, data.body);
    if (!data.title || !data.body) {
      window.alert('vui lòng nhập đầy đủ');
    } else {
      this.postService
        .addPost(post)
        .subscribe(
          (succes: boolean) => {
            if (succes === true) {
              window.alert('Create post succes');
              this.goBack();
            } else {
              console.log('error create post');
            }
          },
          (error: any) => {
            console.log('error create post' + error);
          }
        );
    }
  }
  updatePost() {
    this.post$
      ?.pipe(
        filter((post) => post !== undefined),
        take(1)
      )
      .subscribe((updatedPost) => {
        if (updatedPost) {
          this.postService.editPost(updatedPost).subscribe(
            (succes: boolean) => {
              if (succes === true) {
                window.alert('Edit post succes');
                this.goBack();
              } else {
                console.log('error edit post');
              }
            },
            (error: any) => {
              console.log('error edit post' + error);
            }
          );
        }
      });
  }
  goBack() {
    this.postService.goBack();
  }
  loadPost(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.post$ = this.postService.Posts$.pipe(
        map((posts) => posts.find((post) => post.id === id))
      );
    }

  }
}
