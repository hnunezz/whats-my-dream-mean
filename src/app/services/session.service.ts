import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  setSession(key: string, input: string) {
    sessionStorage.setItem(key, input);
  }

  getSession(key: string) {
    return sessionStorage.getItem(key) as string;
  }

  hasSession(key: string) {
    return sessionStorage.getItem(key) !== null
  }

  deleteSession(key: string) {
    sessionStorage.removeItem(key)
  }
}
