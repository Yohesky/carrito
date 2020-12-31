import { Component, OnInit } from '@angular/core';
import { Sellers } from 'src/app/interfaces/sellers';
import {AuthService} from "../../../services/authSellers/auth.service"
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  Seller: Sellers 
  token: string
  msg: string = ''
  ngOnInit() {
  }

  login(seller: NgForm){
    this.authService.login(seller.value)
    .subscribe(
      res => {
        this.token = res.token
        localStorage.setItem("tokenCarrito", this.token)
        this.router.navigate(["myPosts"])
      }, 
      
      err => this.msg = err.error.msg)
  }

}
