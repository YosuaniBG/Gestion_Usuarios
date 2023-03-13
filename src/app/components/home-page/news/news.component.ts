import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  p: number = 1;
  newsList: any[] = [];

  constructor(private newsService: NewsService){}

  ngOnInit(): void {
    this.newsService.getAll().subscribe(data =>{
      this.newsList = data.articles;
    })
  }

  fixImage(urlImage: string): string{
    return urlImage.slice(0, urlImage.indexOf('?'))+'?resize=1000,1000';
  }

  
  
}
