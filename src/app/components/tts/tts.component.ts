import { Component, OnInit } from '@angular/core';
import { TtsService } from '../../services/models/tts.service';
import { Voicer } from '../../contracts/tts/voicer';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-tts',
  templateUrl: './tts.component.html',
  styleUrl: './tts.component.scss'
})
export class TtsComponent implements OnInit {

  constructor(private ttsService:TtsService){

  }
  text: string = '';
  maxCharacters: number = 2000;
  voices: Voicer[] = [];
  selectedLanguage: string = ''; 
  uniqueLanguages: string[] = [];
  filteredVoices: Voicer[] = [];
  currentAudio: HTMLAudioElement | null = null;


  get characterCount(): string {
    const length = this.text.length;
    return `${length}/${this.maxCharacters}`;
  }

  updateCharacterCount(): void {
    if (this.text.length > this.maxCharacters) {
      this.text = this.text.substring(0, this.maxCharacters);
    }
  }
  
  ngOnInit(): void {
    this.ttsService.getVoicer().subscribe({
      next: (voicesData: any) => {
        this.voices = voicesData.voices;
        this.uniqueLanguages = Array.from(new Set(this.voices.map(voice => voice.languageCodes[0])));
      }
    });
  }

  onLanguageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguage = selectElement.value;
    
    // Seçilen dil ile ilişkili seslendirenleri filtrele
    this.filteredVoices = this.voices.filter(voice => 
      voice.languageCodes.includes(this.selectedLanguage)
    );
  }

  async listen(): Promise<void> {
    const selectedVoice = this.selectedVoice;
    if (!selectedVoice) {
      console.error('No voice selected');
      return;
    }

    try {
      const response:any = await this.ttsService.getSpeech(this.text, selectedVoice.languageCodes[0], selectedVoice.name);
      const audioBytes = response.audioBytes; // Now this will work
      // Convert base64 string to Blob
      const byteCharacters = atob(audioBytes);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);

      this.currentAudio = new Audio(audioUrl);
      this.currentAudio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }
  async downloadAudio(format: 'mp3' | 'wav'): Promise<void> {
    const selectedVoice = this.selectedVoice;
    if (!selectedVoice) {
      console.error('No voice selected');
      return;
    }
  
    try {
      // Fetch audio as a Blob from the backend using await
      const response: any = await this.ttsService.getSpeech(this.text, selectedVoice.languageCodes[0], selectedVoice.name);
      const audioBytes = response.audioBytes;
      const byteCharacters = atob(audioBytes);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: format === 'mp3' ? 'audio/mpeg' : 'audio/wav' });
      const url = URL.createObjectURL(blob);
  
      // Create a temporary link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `audio.${format}`; // Specify the filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error('Error fetching audio for download:', error);
    }
  }
  
  



  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }


  private get selectedVoice(): Voicer | undefined {
    const voiceName = (document.getElementById('voicerName') as HTMLSelectElement).value;
    return this.voices.find(voice => voice.name === voiceName);
  }
  

}
