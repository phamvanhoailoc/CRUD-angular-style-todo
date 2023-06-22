import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Post } from '../models/post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private PostsURL = 'http://localhost:3000';
  private Posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  private hasPosts: boolean = false;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }; //dùng để chuyển đổi dữ liệu về kiểu json
  public Posts$: Observable<Post[]> = this.Posts.asObservable();
  constructor(private http: HttpClient, private location: Location) {}

  goBack() {
    this.location.back();
  }
  getPosts() {
    if (!this.hasPosts) {
      const url = `${this.PostsURL}/posts`;
      this.http.get<Post[]>(url, this.httpOptions).subscribe(
        (data: Post[]) => {
          this.Posts.next(data);
          this.hasPosts = true;
        },
        (error: any) => {
          console.error('Lỗi trong quá trình lấy bài viết:', error);
        }
      );
    }
  }

  editPost(updatedPost: Post): Observable<boolean> {
    return new Observable<boolean>((observable) => {
      const url = `${this.PostsURL}/posts/${updatedPost.id}`;
      this.http.put<any>(url, updatedPost).subscribe(
        (request) => {
          observable.next(true);
        },
        (error: any) => {
          console.log('error edit post: ' + error);
          observable.next(false);
        }
      );
    });
  }
  addPost(post: Post): Observable<boolean> {
    return new Observable<boolean>((observable) => {
      const url = `${this.PostsURL}/posts`;
      this.http.post<any>(url, post).subscribe(
        (post: Post) => {
          const currentvalue = this.Posts.getValue();
          const createPost = [...currentvalue, post];
          this.Posts.next(createPost);
          observable.next(true);
          observable.complete();
        },
        (error: any) => {
          console.error('Lỗi trong quá trình tạo bài viết:', error);
          observable.next(false);
          observable.complete();
        }
      );
    });
  }
  deletePost(id?: number): Observable<boolean> {
    return new Observable<boolean>((observable) => {
      const url = `${this.PostsURL}/posts/${id}`;
      this.http.delete<any>(url).subscribe(
        (request) => {
          const currentPosts = this.Posts.getValue();
          const deletePost = currentPosts.filter((p) => p.id !== id);
          this.Posts.next(deletePost);
          observable.next(true);
          observable.complete();
        },
        (error: any) => {
          console.error('Lỗi trong quá trình xóa bài viết:', error);
          observable.next(false);
          observable.complete();
        }
      );
    });
  }
}
