import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/authSellers/auth.service"
import { Sellers } from 'src/app/interfaces/sellers';
import {NgForm} from "@angular/forms"
import {Router} from "@angular/router"

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  Seller: Sellers 
  file: File
  photoSelected: string | ArrayBuffer
  token: string
  ngOnInit() {
  }

  onPhotoSelected(event: HtmlInputEvent): void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0]
      //preview img
      const reader = new FileReader()
      reader.onload = e => this.photoSelected = reader.result
      reader.readAsDataURL(this.file)
    }
  }


   register(seller: Sellers){
     this.authService.register(seller, this.file)
     .subscribe(
       res => 
       {
         this.token = res.token
         localStorage.setItem("tokenCarrito", this.token)
         this.router.navigate(["/myPosts"])

        }, 
       err => console.log(err))
   }

}
