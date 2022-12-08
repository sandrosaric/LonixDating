import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'client';


  constructor(private http:HttpClient,private accountService:AccountService) {}

  ngOnInit(){
    this.setCurrentUser();
  }


 
  setCurrentUser(){

    //method checks if user exists in ls when app component is initializing
    //thats when you refresh your browser or go to another page
    const userString = localStorage.getItem('user');
    if(!userString) return;

    //if user exists in ls then cache the object on that opened page also
    const user:User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
  
}
