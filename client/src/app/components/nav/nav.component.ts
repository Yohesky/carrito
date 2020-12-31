import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/authSellers/auth.service"
import {AuthUser} from "../../services/authUsers/auth.service"
import { ProductsService } from 'src/app/services/sellersProducts/products.service';
import { Products } from 'src/app/interfaces/products';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private authUser: AuthUser, private productService: ProductsService) { }

  ngOnInit() {
   this.getProducts()
   this.checkSeller()
   this.checkUser()
  }

  products: Products[]
  seller: boolean = false
  user: boolean = false

   ngAfterViewChecked(){
     this.show()
     this.nShow()
   }

  logued(): boolean{
    if(this.authService.isLogued()){
      return true
    }
  }


  getProducts(){
    this.productService.getAll()
    .subscribe( res => this.products = res, err => console.log(err))
  }
  

  logOff(){
    this.authService.logout()
    this.seller = false 
    let signIn = document.getElementById("signInUser")
    let signUp = document.getElementById("signUpUser")
     signIn.style.display = 'initial'
     signUp.style.display = 'initial'
  }

  signOff(){
    this.authUser.logout()
    this.user = false
    let signIn = document.getElementById("signInSeller")
    let signUp = document.getElementById("signUpSeller")
     signIn.style.display = 'initial'
     signUp.style.display = 'initial'
  }

  loguedUser(): boolean{
    if(this.authUser.isLogued()){
      return true
    }
  } 

  
   show(){
     let signIn = document.getElementById("signInSeller")
     let signUp = document.getElementById("signUpSeller")
     if(this.loguedUser()){
       signIn.style.display = "none"
       signUp.style.display = "none"
     }
   }

   nShow(){
    let signIn = document.getElementById("signInUser")
    let signUp = document.getElementById("signUpUser")
    if(this.logued()){
      signIn.style.display = "none"
      signUp.style.display = "none"
    }
  }

  filter(event){
    const val = event.target.value
    const products = document.getElementById("products")
    products.innerHTML = ''

    const lowerCase = val.toLowerCase()

    this.products.forEach(product => {
      const titulo = product.titulo.toLowerCase()

      if(titulo.indexOf(lowerCase) !== -1){
        products.innerHTML += 
        `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <div class="row">
            <div class="col-md-2">
               <strong>  ${product.titulo} </strong> 
            </div>

            <div class="col-md-10">
              <a routerLink="/article/${product._id}" class="btn btn-success">Ver Articulo</a>
            </div>

            
        </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
      </div>
        `
      }

      if(val === ''){
        products.innerHTML = ``
      }
    })

  }

  checkSeller(){
    if(localStorage.getItem("tokenCarrito")){
      this.seller = true
    }
  }

  checkUser(){
    if(localStorage.getItem("tokenUser")){
      this.user = true
    }
  }

 
  
}
