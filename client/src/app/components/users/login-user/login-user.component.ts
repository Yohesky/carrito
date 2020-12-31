import { Component, OnInit } from '@angular/core';
import { AuthUser } from "../../../services/authUsers/auth.service"
import { Users } from 'src/app/interfaces/users';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  constructor(private auth: AuthUser, private router: Router) { }

  ngOnInit() {
  }

  user: Users
  token: string = ''
  msg: string = ''

  login(user: NgForm){
    this.auth.login(user.value)
    .subscribe( 
      res => 
      {
        this.token = res.token
        localStorage.setItem("tokenUser", this.token)
        this.router.navigate(["All"])
      }, err => this.msg = err.error.msg)
  }

}
