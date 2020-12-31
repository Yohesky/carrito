import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/sellersProducts/products.service';
import { Products } from 'src/app/interfaces/products';
import { AuthUser } from 'src/app/services/authUsers/auth.service';
import {ProductsServiceUser} from "src/app/services/usersProducts/products.service"
import {Location} from "@angular/common"

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(private router: Router, private AR: ActivatedRoute, private sp: ProductsService, private productService: ProductsServiceUser, private _location: Location) { }

  user: boolean = false
  msg: string = ''
  id:string
  product: Products

  ngOnInit() {
    // this.loguedUser()
    this.show()
    this.getId()
    this.getArticle()
  }

  goBack(){
    this._location.back()
  }

  getId(){
    this.AR.params.subscribe(params => {
      this.id = params.id
      console.log(this.id);
      
    },
      err => console.log(err)
      
    )
  }

  getArticle(){
    this.sp.getArticle(this.id)
    .subscribe(res => this.product = res, err => console.log(err))
  }

  

  show(){
    
    if(localStorage.getItem("tokenUser")){
      this.user = true      
    }
  }


  buyArticle(id: string){
    this.productService.buy(id)
    .subscribe( res => this.msg = res.msg, err => console.log(err))
  }

}
