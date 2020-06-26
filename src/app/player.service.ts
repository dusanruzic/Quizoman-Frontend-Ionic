import { IPlayer } from './player';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player;
  token:string;

  constructor(private http: HttpClient, private _tokenService: TokenService) {
    this.token = _tokenService.getToken();
   }

  getPlayers(): Observable<IPlayer[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };
    
    return this.http.get<IPlayer[]>('http://127.0.0.1:8000/rest/players/', httpOptions);
  }

  getUpToDatePlayer(url) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    
    return this.http.get(url, httpOptions);
  }

  getPlayerPoint(){
    this.player.totalPts;
  }

  setPlayerPoints(points){
    this.player.totalPts = this.player.totalPts + points;
  }

  

  setPlayer(player){
    this.player = player;
    console.log("Setovani player:");
    console.log(player);
  }

  getPlayer(){
    console.log("getovani player:");
    console.log(this.player);
    return this.player;
  }

  getToken(){
    return this.token;
  }

  createPlayer(ime, prezime, email, username){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };

     return this.http.post('http://127.0.0.1:8000/rest/players/',{"firstname": ime, "lastname": prezime, "email": email, "username": username, "totalPts": 0,"totalQuestionsCreated": 0, "badge_id": 3},httpOptions)
 
  }

  deleteAccount(url){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };

     this.http.delete(url,httpOptions).subscribe((result) => {
      console.log(result);
      console.log("Uspesno si obrisao profil");
},(err:HttpErrorResponse)=>{
  console.log("Nisi uspesno obrisao profil!");
});
 
  }

  azurirajPoene(dotadasnjiBrojPoena, ukupnoOsvojenoUPartiji){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

     return this.http.patch(this.player.url, {"totalPts": dotadasnjiBrojPoena + ukupnoOsvojenoUPartiji},httpOptions);
  }

  azurirajBrojKreiranihPitanja(brojKreiranih){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    let badge_id = 1;
     let noviBroj = brojKreiranih + 1;
     if (noviBroj <=1) {
      badge_id = 3;
     }
     else if (noviBroj <=2) {
      badge_id = 2;
     }
     else if (noviBroj <=3) {
      badge_id = 1;
     }
     else {
      badge_id = 4;
     }
     return this.http.patch(this.player.url, {"totalQuestionsCreated": brojKreiranih + 1, "badge_id": badge_id},httpOptions);
  }


}


