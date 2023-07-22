import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { NewsService } from 'src/app/services/news.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editProfile: boolean = false;
  passwordVisible: boolean = false; 
  changePassword: boolean = false;
  passwordForm: FormGroup;
  userInfoForm: FormGroup;

  newsList: any[] = [];

  userInfo: User = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    image: ''
  }

  constructor(private userService: UserService, private newsService: NewsService){
    this.userInfoForm = new FormGroup({
      firstname: new FormControl('',[]),
      lastname: new FormControl('',[]),
      username: new FormControl('',[]),
      email: new FormControl('',[]),
      phone: new FormControl('',[]),
      image: new FormControl('',[]),
      address: new FormControl('',[]),
      description: new FormControl('',[])
    }),
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', []),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.*?&])[A-Za-z\d@$!%.*?&]+$/)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    {
      validators: this.passwordMatch('password','confirmPassword')
    });
  }

  async ngOnInit(): Promise<void> {
    if(localStorage.getItem('user') !== null)
    {
      const id = parseInt(localStorage.getItem('user')!)
      const [result] = await this.userService.getUser(id);
      this.userInfo = result;
      
    }

    this.newsService.getAll().subscribe(data =>{
      this.newsList = data.articles;
    })
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

  async updateUserInfor(): Promise<void>{
    const result = await this.userService.updateUser(this.userInfo.id!, this.userInfoForm.value)    
    location.reload();
  }

  async changePasswordForm(): Promise<void>{
    console.log(this.passwordForm.value);
    const result = await this.userService.updatePass(this.userInfo.id!, this.passwordForm.value)
    console.log(result);
    
    this.toggleChangePassword();
  }

  toggleChangePassword(): void {
    this.changePassword = !this.changePassword;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  async editProfileActive(): Promise<void> {    
    this.userInfoForm.patchValue({
      firstname: this.userInfo.firstname,
      lastname: this.userInfo.lastname,
      username: this.userInfo.username,
      email: this.userInfo.email,
      phone: this.userInfo.phone,
      image: this.userInfo.image,
      address: this.userInfo.address,
      description: this.userInfo.description
    })
    this.editProfile = true;
  }

  cancelEdition():void{
    this.editProfile = false;
  }

  async changeCover(coverForm:any):Promise<void>{
    const form = coverForm.value;
    
    const result = await this.userService.updateCover(this.userInfo.id!, form)    
    location.reload();
  }

}
