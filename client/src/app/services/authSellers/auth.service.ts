import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http"
import { Sellers } from 'src/app/interfaces/sellers';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URI: string = `http://localhost:8000`
  correo: string
  asking: string
  constructor(private http: HttpClient, private router: Router) { }

   register(seller: Sellers, photo: File){
     const fd = new FormData()
     fd.append("nombre", seller.nombre)
     fd.append("descripcion", seller.descripcion)
     fd.append("direccion", seller.direccion)
     fd.append("password", seller.password)
     fd.append("image", photo)
     fd.append("pregunta", seller.pregunta)
     fd.append("respuesta", seller.respuesta)
     fd.append("correo", seller.correo)
     return this.http.post<any>(this.URI + '/sellers/signUp', fd)
   }

  login(seller){
    return this.http.post<any>(this.URI + "/sellers/signIn", seller)
  }

  isLogued(): boolean{
    if(localStorage.getItem("tokenCarrito"))
    {
      return true
    }
  }

  logout(){
    localStorage.removeItem("tokenCarrito")
    this.router.navigate(["/home"])
  }

  getToken(): string{
    if(localStorage.getItem("tokenCarrito")){
      return localStorage.getItem("tokenCarrito")
    }

    if(localStorage.getItem("tokenUser")){
      return localStorage.getItem("tokenUser")
    }
  }

  recoverPass(email: string): Observable<string>{
    this.correo = email
   return this.http.post<string>(this.URI + "/sellers/recoverSeller", email)
  }

  ask(question: string){
    var data = Object.assign({}, this.correo, this.asking = question)
    return this.http.post<any>(this.URI + "/sellers/recoverSeller", data)
  }

  password(password: string): Observable<string>{
    var data = Object.assign({}, this.correo, this.asking, password)
    return this.http.post<string>(this.URI + "/sellers/recoverSeller", data)
  }

}
