import { Component, OnInit } from '@angular/core';
import {AuthUser} from "../../../services/authUsers/auth.service"
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/interfaces/users';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss']
})
export class RecoverPassComponent implements OnInit {

  constructor(private authService: AuthUser) { }

  ngOnInit() {
  }

  user: Users
  clientRes: string
  pass: string
  pregunta: string
  showCorreo: boolean = true
  showRes: boolean = false
  showPass: boolean = false



  sendEmail(user: NgForm){    
    this.authService.recoverPass(user.value)
    .subscribe
    (res => 
      {
        this.pregunta = res
        console.log(this.pregunta)
        this.showCorreo = false
        this.showRes = true
        console.log(res);
        
        ;
        
      }, err => console.log(err))
  }

  sendQuestion(question: NgForm){
      this.authService.ask(question.value)
      .subscribe(res => 
        {
          console.log(res);
          this.showRes = false
          this.showPass = true
          
          
          }, err => console.log(err))
  }

  sendPassword(password: NgForm){
      this.authService.password(password.value)
      .subscribe(res => this.showPass = true,err => console.log(err))
  }

}
