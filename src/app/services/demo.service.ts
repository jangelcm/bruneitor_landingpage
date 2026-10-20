import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DemoRequestPayload {
  name: string;
  whatsapp: string;
  email?: string;
  company?: string;
  industry?: string;
  monthlyVolume?: string;
  notes?: string;
}

export interface DemoRequestResponse {
  success: boolean;
  contactId?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.bruneitor.com/api/v1/contacts/public/request-demo';

  /**
   * Envía la solicitud de demo al backend oficial de Bruneitor AI
   * Registra el prospecto en CRM y dispara la bienvenida por WhatsApp
   */
  requestDemo(payload: DemoRequestPayload): Observable<DemoRequestResponse> {
    return this.http.post<DemoRequestResponse>(this.apiUrl, payload);
  }
}
