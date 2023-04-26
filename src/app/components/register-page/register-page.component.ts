import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms'
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  signed: boolean = false;
  register: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
    ){
    this.register = new FormGroup(
    {
      firstname: new FormControl('',[Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('',[Validators.required, Validators.minLength(2)]),
      image: new FormControl(''),
      email: new FormControl('',[Validators.required, Validators.email]),
      username: new FormControl('',[Validators.required]),
      currentPassword: new FormControl('',[]),
      password: new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.*?&])[A-Za-z\d@$!%.*?&]+$/)]),
      confirmPassword: new FormControl('',[Validators.required]),
      agreements: new FormControl('',[Validators.requiredTrue])
    },
    {
      validators: this.passwordMatch('password','confirmPassword')
    });
    
  }

  ngOnInit(){
    if(!localStorage.getItem('token'))
      this.signed = false;
    else
      this.signed = true;
  }

  passwordMatch(password:any, confirmPassword:any): any  {
    return (formGroup:FormGroup)=>{
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if(confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']){
        return;
      }
      
      if(passwordControl.value !== confirmPasswordControl.value){
        confirmPasswordControl.setErrors({ mustMatch: true });
      }else{
        confirmPasswordControl.setErrors(null);
      }
    }

  }
  

  async sendRegister(){
    const {firstname, lastname, image, email, username, password} = this.register.value;
    const data: User = {firstname, lastname, image, email, username, password};
    try{
      let resp = await this.userService.createUser(data)
      localStorage.setItem('user', resp.userid);
      localStorage.setItem('token', resp.token);
      if(!resp.error){
        Swal.fire({
          title: 'Excelente!',
          text: `Se ha resgistrado satisfactoriamente`,
          icon: 'success',
          confirmButtonColor: '#3085d6'
        })
        .then(result =>{
          if(result.isConfirmed)
              this.router.navigate(["/home"])
              this.register.reset
        }); 
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
