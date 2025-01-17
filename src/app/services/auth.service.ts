import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './models/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor(private jwtHelper:JwtHelperService, private userService:UserService) { }
  async identityCheck(){
    if (typeof localStorage !== 'undefined') {
      const token: string | any = localStorage.getItem("accessToken");
      let expired: Promise<boolean> | boolean;
      try {
        expired = this.jwtHelper.isTokenExpired(token);
      } 
      catch {
        expired = true;
      }
      if(expired){
        const refreshToken: string | any = localStorage.getItem("refreshToken");
        if(refreshToken)
          this.userService.refreshTokenLoginCustomer(refreshToken).then(refresh => {
          _isAuthenticate = refresh;
        });
        else
          _isAuthenticate=false;
      }
      else
        _isAuthenticate = true;
    } 
    else {
      _isAuthenticate = false;
    }
  }
  get isAuthenticated():boolean{
    return _isAuthenticate;
  }
}

export let _isAuthenticate : boolean;