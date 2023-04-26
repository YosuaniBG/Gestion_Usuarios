import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom} from 'rxjs';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url: string ="http://localhost:3000/api/";

  constructor(private httpClient: HttpClient) {}

  createPost(post: Post): Promise<any>{
    return lastValueFrom(this.httpClient.post<Post>(`${this.url}posts`, post));
  }

  getAllPost(): Promise<any>{
    return lastValueFrom(this.httpClient.get<Post>(`${this.url}posts`));
  }

  getOnePost(id: number): Promise<any>{
    return lastValueFrom(this.httpClient.get<Post>(`${this.url}posts/${id}`));
  }
}
