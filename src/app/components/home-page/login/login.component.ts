import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private router: Router
    ){}

  async loginProcess(loginForm:any){
    const userData: any = loginForm.value;
    try{
      let resp = await this.userService.login(userData)
      if(!resp.error){
        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', resp.userid);
        this.router.navigate(['/home']);
        window.location.reload();
      }else{
        Swal.fire({
          text: resp.error,
          confirmButtonColor: '#3085d6',
          icon: 'warning'
        })
      }
    }catch(error: any){
      Swal.fire({
        text: error.message,
        confirmButtonColor: '#3085d6',
        icon: 'warning'
      })
    }
  }
}
