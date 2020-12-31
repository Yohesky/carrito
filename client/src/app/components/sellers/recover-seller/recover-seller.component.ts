import { Component, OnInit } from '@angular/core';
import { Sellers } from 'src/app/interfaces/sellers';
import { NgForm } from '@angular/forms';
import {AuthService} from "../../../services/authSellers/auth.service"
@Component({
  selector: 'app-recover-seller',
  templateUrl: './recover-seller.component.html',
  styleUrls: ['./recover-seller.component.scss']
})
export class RecoverSellerComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  seller: Sellers
  clientRes: string
  pass: string
  pregunta: string
  showCorreo: boolean = true
  showRes: boolean = false
  showPass: boolean = false



  sendEmail(seller: NgForm){    
    this.authService.recoverPass(seller.value)
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
