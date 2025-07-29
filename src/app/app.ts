import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";

export interface DreamResponse {
  dream: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly http = inject(HttpClient);
  private baseUrl = 'https://backend-whats-my-dream-mean-production.up.railway.app';

  prompt(input: string): Observable<DreamResponse> {
    return this.http.post<DreamResponse>(`${this.baseUrl}/prompt/dream`, { input }, {
      withCredentials: true
    });
  }
}
