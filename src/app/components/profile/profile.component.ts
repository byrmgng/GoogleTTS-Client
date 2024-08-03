import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TtsService } from '../../services/models/tts.service';
import { UserService } from '../../services/models/user.service';
import { GetUserInfo } from '../../contracts/user/getUserInfo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(private userService:UserService){}
  @ViewChild('nameSurname') nameSurname: ElementRef | any;
  @ViewChild('email') email: ElementRef | any;
  @ViewChild('packageName') packageName: ElementRef | any;
  @ViewChild('remainingCharacters') remainingCharacters: ElementRef | any;
  @ViewChild('renewalDate') renewalDate: ElementRef | any;
  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: (userData: GetUserInfo) => {
        this.nameSurname.nativeElement.value = userData.nameSurname;
        this.email.nativeElement.value = userData.email;
        this.packageName.nativeElement.value = userData.packageName;
        this.renewalDate.nativeElement.value = userData.renewalDate;
        this.remainingCharacters.nativeElement.value = userData.remainingCharacters;
      }
    });
  }
}
