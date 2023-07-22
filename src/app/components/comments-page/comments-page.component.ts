import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-page',
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.scss']
})
export class CommentsPageComponent implements OnInit {


  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
