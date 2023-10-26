import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {

  private httpClient = inject(HttpClient);

  sendMail(email: any) {
    const body = { "email": email };

    return firstValueFrom(
      this.httpClient.post<any>('https://crm-back1.onrender.com/send-email', body)
    )
  }
}
