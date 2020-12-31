import { Component, OnInit, ViewChild } from '@angular/core';
import {ProductsServiceUser} from "../../../services/usersProducts/products.service"
import { Products } from 'src/app/interfaces/products';
import { CarpreviewComponent } from '../carpreview/carpreview.component';

@Component({
  selector: 'app-all-articles-users',
  templateUrl: './all-articles-users.component.html',
  styleUrls: ['./all-articles-users.component.scss']
})
export class AllArticlesUsersComponent implements OnInit {

  constructor(private psu: ProductsServiceUser) { }
  products: Products[]
  @ViewChild(CarpreviewComponent, {static: true})
  CarPreview: CarpreviewComponent
  currentPage: number = 1
  msg: string = ''

  ngOnInit() {
    this.get()
  }

  sub(res,err){
    console.log(res),
    console.log(err);
  }

  get(){
    this.psu.getAll().subscribe(res => this.products = res,err => console.log(err))
  }

  buy(id: string){
    
    this.psu.buy(id).
    subscribe(res => 
      {
        console.log(res)
        this.msg = 'Agregado satisfactoriamente!'
        this.CarPreview.callService = true
        this.CarPreview.reload()
      }, err => this.msg = err)
  }


  recibirMsg(mensaje: string){
    console.log(mensaje)
  }
}
