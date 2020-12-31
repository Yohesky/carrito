import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from "../../../services/sellersProducts/products.service"
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import Swal from "sweetalert2"
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}
import {AllArticlesComponent} from "../all-articles/all-articles.component"
import { SweetAlert } from 'sweetalert/typings/core';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  public formProduct: FormGroup
  constructor(private productService: ProductsService) {
    this.formProduct = this.createForm()
  }
  @ViewChild(AllArticlesComponent, {static: true})
  AllComponent: AllArticlesComponent
  product: Products
  file: File
  photoSelected: string | ArrayBuffer
  edit: boolean = false
  @Output() enviar: EventEmitter<string> = new EventEmitter<string>()
  texto: string = 'Producto Actualizado!'
  msg: string = ''

  ngOnInit() {
    
  }


  createForm() {
    return new FormGroup({
      _id: new FormControl(''),
      titulo: new FormControl('', [Validators.required]),
      descripcionArticulo: new FormControl('', [Validators.required]),
      precio: new FormControl('', Validators.required),
      foto: new FormControl('', [Validators.required])
    })
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0]
      //preview img
      const reader = new FileReader()
      reader.onload = e => this.photoSelected = reader.result
      reader.readAsDataURL(this.file)
    }
  }

  save() {

    if (this.edit == false) {
      console.log('guardando');
      this.productService.saveProduct(this.formProduct.value, this.file).subscribe(res => 
        {
          this.formProduct.reset()
          this.msg = res.msg
          Swal.fire('Save', this.msg, 'success')
        }, err => console.log(err))
    }
    else {
      console.log('editando', this.formProduct.value);
      this.productService.updateProduct(this.formProduct.value, this.file)
        .subscribe(res => {
          this.enviar.emit(this.texto)
        }, err => console.log(err))
    }

  }



  getPro(producto: Products) {
    this.formProduct.controls["_id"].setValue(producto._id)
    this.formProduct.controls["titulo"].setValue(producto.titulo)
    this.formProduct.controls["descripcionArticulo"].setValue(producto.descripcionArticulo)
    this.formProduct.controls["precio"].setValue(producto.precio)
    this.formProduct.controls["foto"].setValue(producto.foto)
  }



}
