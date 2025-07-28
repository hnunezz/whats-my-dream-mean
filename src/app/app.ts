import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { from, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private http = inject(HttpClient);

  set(key: string, input: string) {
    sessionStorage.setItem(key, input);
  }

  get(key: string) {
    return sessionStorage.getItem(key) as string;
  }

  has(key: string) {
    return sessionStorage.getItem(key) !== null
  }

  delete(key: string) {
    sessionStorage.removeItem(key)
  }
  prompt(input: string) {
    return this.http.post('/dream', { input });
  }
  getss() {
    return this.http.get('/test');
  }
}
