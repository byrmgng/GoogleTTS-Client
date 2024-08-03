import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TtsComponent } from './tts.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TtsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"tts", component:TtsComponent}
    ]),
    FormsModule,
  ]
})
export class TtsModule { }
