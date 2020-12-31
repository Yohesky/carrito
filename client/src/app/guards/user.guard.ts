import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUser } from "../services/authUsers/auth.service"
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private auth: AuthUser, private router: Router){}
  canActivate(): boolean {
    if(this.auth.isLogued()){
      return true
    }

    this.router.navigate(["/home"])
    return false
  }
  
}
