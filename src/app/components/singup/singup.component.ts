import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUser } from '../../contracts/user/createUser';
import { UserService } from '../../services/models/user.service';
import { User } from '../../entities/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SingupComponent implements OnInit{
  signupForm!:FormGroup;
  constructor(private fb:FormBuilder, private userService: UserService,private toastr:ToastrService,private router: Router){
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      iAgree: [false, Validators.requiredTrue]
    });
  }


  async signup(){
    if (this.signupForm.valid) {
      const formValues = this.signupForm.value;
      const createUserProperty:User={
        nameSurname: formValues.firstName +" "+ formValues.lastName,
        email:formValues.email,
        password:formValues.password
      };

      const result : CreateUser = await this.userService.createUser(createUserProperty);
      debugger;
      console.log(result);
      if(result.success)
        {
          this.toastr.success(result.message,"Kayıt Başarılı")
          this.router.navigateByUrl('/login')

        }
        else
        {
          this.toastr.error(result.message,"Hata")
        }
    } else {
      this.toastr.error("Lütfen Bilgileri Eksiksiz Doldurunuz","Hata")
    }
  }
}
