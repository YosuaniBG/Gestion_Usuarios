import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): boolean | UrlTree {
    const loginToken: string | null = localStorage.getItem('token');
    if(loginToken){
      return true;
    }else{
      return false;
      this.router.navigate(['/home']);
    }
    
    
  }
  
}
