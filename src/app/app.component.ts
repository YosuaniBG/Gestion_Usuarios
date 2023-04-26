import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestion_Usuarios';

  signed: boolean = false;
  userImage: string = '';

  constructor(
    private router: Router,
    private userService: UserService
    ){}

  salir():void{
    localStorage.clear();
    
    if(this.router.routerState.snapshot.url === '/home')
      window.location.reload();
    else{
      this.router.navigate(['/home']);
    }
  }

  async ngOnInit(){
    const userSignedId = localStorage.getItem('user');
    if(userSignedId){
      const userSigned = await this.userService.getUser(parseInt(userSignedId));
      this.userImage = userSigned[0].image;
    }
  }

  ngDoCheck(){
    if(localStorage.getItem('token'))
      this.signed = true;

    if(this.router.routerState.snapshot.url === '/home' && !localStorage.getItem('token'))
      this.signed = false;
  }
}
