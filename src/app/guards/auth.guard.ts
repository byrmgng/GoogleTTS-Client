import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService, _isAuthenticate } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const router:Router = inject(Router);
  const toastr:ToastrService = inject(ToastrService);
  const authService:AuthService=inject(AuthService);
  authService.identityCheck();
  if(!_isAuthenticate)
  {
    router.navigate(["login"], { queryParams: { returnUrl: state.url }})
          .then(() => {
            //Bu alanda yetkisiz erişim varsa uyarı mesajı bastırılabilir.
          });
  }
  
  return true;
};
