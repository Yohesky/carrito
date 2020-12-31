import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/authSellers/auth.service"
import {AuthUser} from "../services/authUsers/auth.service"
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private auth: AuthService,private authUser: AuthUser, private router: Router){}
  canActivate(): boolean {
    if(this.auth.isLogued() || this.authUser.isLogued()){
      return true
    }

    this.router.navigate(["/login"])
    return false
  }
  
}
