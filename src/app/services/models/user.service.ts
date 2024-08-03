import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../entities/user';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { CreateUser } from '../../contracts/user/createUser';
import { LoginUser } from '../../contracts/user/loginUser';
import { GetUserInfo } from '../../contracts/user/getUserInfo';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClientService: HttpClientService) { }
  async createUser (user : User):Promise<CreateUser> {
    const observeble: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller:"User",
      action:"CreateUser"
    },user);
    return await firstValueFrom(observeble) as CreateUser;
  }
  async loginUser(mailorPhoneNumber:string,password:string):Promise<LoginUser>{
    const observeble:Observable<any | LoginUser> = this.httpClientService.post<any | LoginUser>({
      controller:"User",
      action:"LoginUser",
    },{mailorPhoneNumber,password})
    const result =await firstValueFrom(observeble) as LoginUser;
    if(result.success){
      localStorage.setItem("accessToken",result.token.accessToken);
      localStorage.setItem("refreshToken",result.token.refreshToken);
    }
    return result;
  }
  
  async refreshTokenLoginCustomer(refreshToken:string):Promise<boolean>{
    const observeble:Observable<any | LoginUser> = this.httpClientService.post<any | LoginUser>({
      controller:"User",
      action:"RefreshTokenLoginUser",
    },{refreshToken})
    const result =await firstValueFrom(observeble) as LoginUser;
    if(result.success){
      localStorage.setItem("accessToken",result.token.accessToken);
      localStorage.setItem("refreshToken",result.token.refreshToken);
    }
    return result.success;
  }
  getUserInfo(): Observable<GetUserInfo> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');

    return this.httpClientService.get<GetUserInfo>({
      controller:"User",
      action:"GetUserInfo",
      headers: headers
    }).pipe(
      catchError(errorResponse => {
        throw errorResponse.message;
      })
    );
  }

}
