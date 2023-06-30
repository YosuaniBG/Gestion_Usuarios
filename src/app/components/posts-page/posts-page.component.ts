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
  listPosts: Post[] = [];
  userSignedId: number = 0;

  constructor(private postService: PostsService) {
    this.formPost = new FormGroup({
      title: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    
  }

  async ngOnInit(){
    const user = localStorage.getItem('user');
    if(user){
      this.userSignedId = parseInt(user);
    }
    this.loadPosts();
  }

  async loadPosts(){
    this.listPosts = await this.postService.getAllPost();
    console.log(this.listPosts);
    
  }

  // async loadLikes(id:number): Promise<number>{
  //   const likes = await this.postService.getOnePost(id);
  //   console.log(likes);
  //   return likes;
    
  // }

  // async loadComments(id:number): Promise<number>{
  //   const comments = await this.postService.getOnePost(id);
  //   console.log(comments);
  //   return comments;
  // }

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
}
