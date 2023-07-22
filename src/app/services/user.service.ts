import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom} from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string ="http://localhost:3000/api/";

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Promise<any>{
    return lastValueFrom(this.httpClient.post<User>(`${this.url}register`, user));
  }

  updateUser(id: number, data: any): Promise<any>{
    return lastValueFrom(this.httpClient.put<any>(`${this.url}users/${id}`, data))
  }

  updateCover(id: number, data: any): Promise<any>{
    return lastValueFrom(this.httpClient.put<any>(`${this.url}users/${id}/change_cover`, data))
  }

  updatePass(id: number, data: any): Promise<any>{
    return lastValueFrom(this.httpClient.put<any>(`${this.url}users/${id}/change_pass`, data))
  }

  login(userLogin: any): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(`${this.url}login`, userLogin));
  }

  getUser(id: number): Promise<any>{
    return lastValueFrom(this.httpClient.get<User>(`${this.url}users/${id}`));
  }
}
