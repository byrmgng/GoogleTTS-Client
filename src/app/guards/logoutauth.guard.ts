import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { _isAuthenticate } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const logoutauthGuard: CanActivateFn = (route, state) => {

  const router:Router = inject(Router);
  const toastr:ToastrService = inject(ToastrService);

  if(_isAuthenticate)
  {
    router.navigate(["tts"]);
  }
  
  return true;
};
