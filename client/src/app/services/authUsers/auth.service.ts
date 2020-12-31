import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Users } from 'src/app/interfaces/users';
import {Router} from "@angular/router"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUser {

  constructor(private http: HttpClient, private router: Router) { }
  URI = "http://localhost:8000"
  correo: string
  asking: string

  login(user: Users){
    return this.http.post<any>(this.URI + "/users/signIn", user)
  }

  signUp(user: Users){
    return this.http.post(this.URI + "/users/signUp", user)
  }

  isLogued(): boolean{
    if(localStorage.getItem("tokenUser"))
    {
    
      return true
    }
  }

  logout(){
    localStorage.removeItem("tokenUser")
    this.router.navigate(["/home"])
  }

  getToken(): string{
    return localStorage.getItem("tokenUser")
  }

  recoverPass(email: string): Observable<string>{
    this.correo = email
   return this.http.post<string>(this.URI + "/users/recoverPass", email)
  }

  ask(question: string){
    var data = Object.assign({}, this.correo, this.asking = question)
    return this.http.post<any>(this.URI + "/users/recoverPass", data)
  }

  password(password: string): Observable<string>{
    var data = Object.assign({}, this.correo, this.asking, password)
    return this.http.post<string>(this.URI + "/users/recoverPass", data)
  }
}
