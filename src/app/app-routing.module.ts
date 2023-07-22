import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { CommentsPageComponent } from './components/comments-page/comments-page.component';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: '*', redirectTo: '/home'},
  {path: 'home', component: HomePageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'register/:id/profile', component: ProfileComponent},
  {path: 'todo', component: TodoPageComponent, canActivate: [ LoginGuard ] },
  {path: 'posts', component: PostsPageComponent, canActivate: [ LoginGuard ] },
  {path: 'posts/:id', component: CommentsPageComponent, canActivate: [ LoginGuard ]  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
