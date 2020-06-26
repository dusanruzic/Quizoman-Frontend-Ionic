import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token: string = "Token d88954e677a1a3f1b10dc1640faf661de5db26e1";
  constructor() { }

  getToken(){
    return this.token;
  }
}
