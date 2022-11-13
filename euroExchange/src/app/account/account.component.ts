import { Component, OnInit } from '@angular/core';
import { sample_users } from '../data';
import { ApiService } from '../service/api.service';
import { User } from '../models/users';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public change2 : any
  user!:User
  constructor(private api:ApiService, private userService:UserService) {
    userService.userObservable.subscribe((newUser) =>
    {
      this.user = newUser
    })
   }

  ngOnInit(): void {
    this.api.getAllEuro().subscribe(res =>
      {
        this.change2 = res
      })
      
  }

  test()
  {
    console.log(this.change2)
  }

  logOut()
  {
    this.userService.logout()
  }

}
