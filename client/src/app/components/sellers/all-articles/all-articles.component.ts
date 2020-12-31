import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../services/sellersProducts/products.service"
import { Products } from 'src/app/interfaces/products';
import * as $ from "jquery";
import {Router} from "@angular/router"
@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit {

  constructor(private sp: ProductsService, private router: Router) { }
  products: Products[]
  currentPage: number = 1

  ngOnInit() {
    this.getProducts()
  }

  getProducts(){
    this.sp.getAll()
    .subscribe(res => 
      {
        console.log(res)
        this.products = res
      }, err => console.log(err))
  }


  verProduct(id: string){
    this.router.navigate([`/article/${id}`])
  }
  


}
