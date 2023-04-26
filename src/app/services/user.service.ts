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

  login(userLogin: any): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(`${this.url}login`, userLogin));
  }

  getUser(id: number): Promise<any>{
    return lastValueFrom(this.httpClient.get<User>(`${this.url}users/${id}`));
  }
}
