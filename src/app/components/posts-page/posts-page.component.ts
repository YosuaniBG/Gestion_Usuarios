import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
})
export class PostsPageComponent {
  formPost: FormGroup;
  userSignedId: number = 0;
  editPost: boolean = false;

  listPosts: Post[] = [];
  listPostsToShow: Post[] = [];
  currentCount: number = 6;


  constructor(private postService: PostsService) {
    this.formPost = new FormGroup({
      title: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    
  }

  async ngOnInit(){
    window.scrollTo(0, 0);
    
    const user = localStorage.getItem('user');
    if(user){
      this.userSignedId = parseInt(user);
    }
    this.loadPosts();
  }

  async loadPosts(){
    this.listPosts = await this.postService.getAllPost();
    this.listPostsToShow = this.listPosts.slice(0, this.currentCount)
    console.log(this.listPostsToShow);
    
  }

  showMore() {
    if (this.currentCount < this.listPosts.length) {
      const rest = this.listPosts.length - this.currentCount;
      const itemsToAdd = Math.min(rest, 3);
      this.listPostsToShow = this.listPosts.slice(0, this.currentCount + itemsToAdd);
      this.currentCount += itemsToAdd;
    }
  }

  async enviarPost() {
    let data = this.formPost.value;
    const userSignedId = localStorage.getItem('user');
    if (userSignedId) {
      data['publication_date'] = dayjs().format('YYYY-MM-DD'),
      data['id_user'] = parseInt(userSignedId)
      };
    try{
      let resp = await this.postService.createPost(data);
      if(!resp.error){
        Swal.fire({
          title: 'Excelente!',
          text: `Se ha resgistrado un post satisfactoriamente`,
          icon: 'success',
          confirmButtonColor: '#3085d6'
        })
        .then(result =>{
          if(result.isConfirmed)
              this.formPost.reset();     
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

  toggleEditPost(){
    this.editPost = !this.editPost;
  }

}
