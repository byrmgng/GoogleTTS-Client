import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { TtsComponent } from './components/tts/tts.component';
import { authGuard } from './guards/auth.guard';
import { logoutauthGuard } from './guards/logoutauth.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:"",component:HomeComponent,loadChildren:() => import("./components/home/home.module").then(module=>module.HomeModule),canActivate:[logoutauthGuard]},
  {path:"login",component:LoginComponent,loadChildren:() => import("./components/login/login.module").then(module=>module.LoginModule),canActivate:[logoutauthGuard]},
  {path:"signup",component:SingupComponent,loadChildren:() => import("./components/singup/singup.module").then(module=>module.SingupModule),canActivate:[logoutauthGuard]},
  {path:"tts",component:TtsComponent,loadChildren:() => import("./components/tts/tts.module").then(module=>module.TtsModule),canActivate:[authGuard]},
  {path:"profile",component:ProfileComponent,loadChildren:() => import("./components/profile/profile.module").then(module=>module.ProfileModule),canActivate:[authGuard]},
  {path: "**", redirectTo: "" } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
