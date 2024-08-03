import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/models/user.service';
import { LoginUser } from '../../contracts/user/loginUser';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  constructor(private userService:UserService, private toastr:ToastrService,private router:Router,private activatedRoot:ActivatedRoute,private authService:AuthService)
  {

  }
  @ViewChild('txtMailorPhoneNumber') txtMailorPhoneNumber: ElementRef | any;
  @ViewChild('txtPassword') txtPassword: ElementRef |any;
  ngOnInit(): void {
  }
  async onSubmit(){
    const result : LoginUser = await this.userService.loginUser(this.txtMailorPhoneNumber.nativeElement.value,this.txtPassword.nativeElement.value);
    this.authService.identityCheck();

    if(!result.success)
    {
      this.toastr.error(result.message,"HATA")
    }
    else{
      this.toastr.success(result.message,"Giriş Başarılı");
      this.activatedRoot.queryParams.subscribe(params=>{
        const returnUrl : string = params["returnUrl"];
        if(returnUrl){
          
          this.router.navigate([returnUrl]);
        }
        else{
          this.router.navigateByUrl('')
        }
      })
    }
  }

}
