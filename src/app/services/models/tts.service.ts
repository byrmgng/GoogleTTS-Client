import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { Voicer } from '../../contracts/tts/voicer';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor(private httpClientService: HttpClientService) { }
  getVoicer(): Observable<Voicer> {
    return this.httpClientService.get<Voicer>({
      controller:"TTS",
      action:"GetVoicer",
    }).pipe(
      catchError(errorResponse => {
        throw errorResponse.message;
      })
    );
  }
  async getSpeech(text: string, languageCode: string, voiceName: string): Promise<string> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    
    try {
      const observable: Observable<string | object> = this.httpClientService.post<string | object>({
        controller: "TTS",
        action: "GetSpeech",
        headers: headers
      }, { text, languageCode, voiceName });
      const response = await firstValueFrom(observable);
      return response as string;
    } catch (error) {
      console.error('Error fetching speech:', error);
      throw new Error('Failed to fetch speech');
    }
  }
}
