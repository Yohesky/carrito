import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { Products } from 'src/app/interfaces/products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  URI: string = "http://localhost:8000"
  editar: boolean = false
  public productSelected: Products = {
    _id: null
  }
  constructor(private http: HttpClient) { 
 
  }

 

  getProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(this.URI + "/sellers/articles//myArticles")
  }

  getArticle(id: string): Observable<Products>{
    return this.http.get<Products>(this.URI + `/sellers/articles/article/${id}`)
  }

  getAll(): Observable<Products[]>{
    return this.http.get<Products[]>(this.URI + "/sellers/articles/all")
  }

  saveProduct(product: Products, photo: File){
    const newProduct = new FormData()
    newProduct.append("titulo", product.titulo)
    newProduct.append("descripcionArticulo", product.descripcionArticulo)
    newProduct.append("precio", product.precio)
    newProduct.append("image", photo)
    return this.http.post<any>(this.URI + '/sellers/articles/saveArticle', newProduct)
  }

  updateProduct(product: Products, photo: any){ 
       const updateProduct = new FormData()
       updateProduct.append("_id", product._id)
       updateProduct.append("titulo", product.titulo)
       updateProduct.append("descripcionArticulo", product.descripcionArticulo)
       updateProduct.append("precio", product.precio)
       updateProduct.append("image", photo)
      console.log(product);
  
     return this.http.put<Products[]>(this.URI + `/sellers/articles/updateArticle/${product._id}`, updateProduct)
  }

  deleteProduct(id: string){
    return this.http.delete(this.URI + `/sellers/articles/deleteArticle/${id}`)
  }
}
