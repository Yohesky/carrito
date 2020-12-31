import { Component, OnInit, Output, ViewChild } from '@angular/core';
import {ProductsService} from "../../../services/sellersProducts/products.service"
import { Products } from 'src/app/interfaces/products';
import { FormProductComponent } from '../form-product/form-product.component';
import Swal from "sweetalert2"


@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss']
})
export class MyArticlesComponent implements OnInit  {

  constructor(private sp: ProductsService) { }
  products: Products[]
  @ViewChild(FormProductComponent, {static: true})
  FormComponent: FormProductComponent
  currentPage: number = 1

  ngOnInit() {
    this.getProducts()
  }

  getProducts(){
    this.sp.getProducts()
    .subscribe(res => 
      {
        console.log(res)
        this.products = res
      }, err => console.log(err))
  }

 

  passComponent(product: Products, id: string){
     this.FormComponent.edit = true
     this.FormComponent.getPro(product)
     console.log(product);
  }

  delete(id:string){
    Swal.fire({
      title: 'Deleting',
      text: 'Please wait...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    })
    this.sp.deleteProduct(id)
    .subscribe(res => 
      {
        Swal.close()
        this.getProducts()
        
      }, 
      err => console.log(err))
  }

  recibirmsg(mensaje: string){
    let plantilla: string = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>${mensaje}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>`
    let msg = document.getElementById("msg")
    this.getProducts()
    msg.innerHTML = plantilla
    
  }
  

}
