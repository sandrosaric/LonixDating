import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = "https://localhost:5001/api/";

  //observable for sharing data throug components
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post<User>(this.baseUrl + "account/login",model).pipe(
      map((response:User) => {
          const user = response;

          //if you get response it will be saved in ls and in observable cache
          if(user){
            localStorage.setItem('user',JSON.stringify(user));
            this.currentUserSource.next(user);
          }
      })
    );
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl + "account/register",model).pipe(
        map((user) => {
          if(user){
            localStorage.setItem('user',JSON.stringify(user));
            this.currentUserSource.next(user);
          }
          return user;
        })
    )
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  //when user logout, his object will be remove from ls and cache
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
