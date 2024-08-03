import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  text: string = '';
  maxCharacters: number = 50;

  get characterCount(): string {
    const length = this.text.length;
    return `${length}/${this.maxCharacters}`;
  }

  updateCharacterCount(): void {
    if (this.text.length > this.maxCharacters) {
      this.text = this.text.substring(0, this.maxCharacters);
    }
  }
}
