import { Component, OnInit } from '@angular/core';
import {AuthUser} from "../../../services/authUsers/auth.service"
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/interfaces/users';
import Swal from "sweetalert2"
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  constructor(private auth: AuthUser, private router: Router) { }
  user: Users
  ngOnInit() {
  }

  register(user: NgForm){
    this.auth.signUp(user.value).subscribe(res => {
      Swal.fire('User saved', 'User crated successfully', 'success')
      this.router.navigate(["/loginUser"])
    }, err => console.log(err))
  }

}
