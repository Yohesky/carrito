import { Injectable } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http"
import {AuthUser} from "./authUsers/auth.service"

@Injectable({
  providedIn: 'root'
})

export class tokenUserService implements HttpInterceptor{

  constructor(private auth: AuthUser) { }

  intercept(req,next){
    let tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });

    return next.handle(tokenReq)
  }
}
