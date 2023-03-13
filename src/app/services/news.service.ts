import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url: string ="https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8ad7d82e8708408bb2ec18ed2d9ba964";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any>{
      return this.httpClient.get<any>(this.url);
  }
}
