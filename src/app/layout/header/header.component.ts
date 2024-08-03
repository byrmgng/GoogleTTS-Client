import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private toastr:ToastrService,private router:Router,public authService:AuthService){
    authService.identityCheck();
  }
  LogOut(){
    if(localStorage)
    {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    this.toastr.success("Çıkış Yapıldı");
    this.authService.identityCheck();
    this.router.navigateByUrl('');

  }
}
