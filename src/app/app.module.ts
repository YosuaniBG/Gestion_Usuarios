import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeroComponent } from './components/home-page/hero/hero.component';
import { NewsComponent } from './components/home-page/news/news.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {LoginComponent} from './components/home-page/login/login.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { AboutComponent } from './components/home-page/about/about.component';
import { CommentsPageComponent } from './components/comments-page/comments-page.component';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { TrimPipe } from './pipes/trim.pipe';
import { DateFromNowPipe } from './pipes/date-from-now.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeroComponent,
    NewsComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterPageComponent,
    PostsPageComponent,
    AboutComponent,
    CommentsPageComponent,
    TodoPageComponent,
    TrimPipe,
    DateFromNowPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
