import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { Products } from 'src/app/interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceUser {

  constructor(private http: HttpClient) { }
  URI = "http://localhost:8000"

  getAll(): Observable<Products[]>{
    return this.http.get<Products[]>(this.URI + "/users/articles/all")
  }

  myBoughts(): Observable<Object[]>{
    return this.http.get<Object[]>(this.URI + "/users/articles/car")
  }

  buy(id: string){
    return this.http.post<string | any>(this.URI + `/users/articles/buy/${id}`, id)
  }

  deleteArticle(id:string){
    return this.http.delete(this.URI + `/users/articles/deleteBuy/${id}`)
  }
}
