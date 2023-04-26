import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  signed: boolean = false;

  constructor(private userService:UserService){}

  ngOnInit(){
    let signedToken: string | null = localStorage.getItem('token')
    if(signedToken)
      this.signed = true;
  }

}
