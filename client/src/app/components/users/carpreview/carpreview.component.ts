import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import {ProductsServiceUser} from "../../../services/usersProducts/products.service"
import { Products } from 'src/app/interfaces/products';
import { EventEmitter } from '@angular/core';

declare var paypal

@Component({
  selector: 'app-carpreview',
  templateUrl: './carpreview.component.html',
  styleUrls: ['./carpreview.component.scss']
})
export class CarpreviewComponent implements OnInit {

  @ViewChild('paypal', {static:true}) paypalElement: ElementRef

  constructor(private ps: ProductsServiceUser) { }
  products: Products[]
  callService: boolean = false
  val: number = 1
  total: number

  @Output() enviar: EventEmitter<string> = new EventEmitter<string>()
  texto = 'Producto Agregado!'
  currentPage: number = 1
  msgDeleted: string = ''
  
  sum: number

  ngOnInit() {
    this.articles()
    this.payment()
  }

  handleClick(){
    document.querySelector("#btnPaypal").addEventListener('click', () =>{
      console.log('click');
      
    })
  }

  payment(){
    console.log(this.paypalElement);
    
    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: 'producto de prueba',
              amount     :{
                currency_code: 'USD',
                value        : this.sum
              }
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
        
      },
      onError: err =>{
        console.log(err);
        
      }
    })
    .render( this.paypalElement.nativeElement );
  }

  articles(){
    this.ps.myBoughts().subscribe((res: Object | any) => {
      console.log(res);

      let newArray = res.dataArray
      newArray.forEach((data,index) => {
        data.idCompras = res.withId[index]._id
      })     
      this.products = newArray
     
       this.count()
    }, err => console.log(err))
  }

  reload(){
    if(this.callService == true){
      this.articles()
    }
  }

  count()
  {
    this.sum = 0
    this.products.forEach(pay => {
      this.sum += pay.total
    })

    console.log('total: ',this.sum);
  } 

  delete(id:string){
    this.ps.deleteArticle(id)
    .subscribe(res => 
      {
        this.msgDeleted = 'Producto eliminado satisfactoriamente'
        this.articles()
        
      },err => console.log(err))
  }

  handleListener(e?:any, id?: string){
     var value = e.target.value
     const product = this.products.filter(p => p._id === id)
     console.log(product[0], 'produto');

     const valor = product[0].total = value * product[0].precio    
     this.count() 
    
  }


}
