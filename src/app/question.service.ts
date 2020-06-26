import { TokenService } from './token.service';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ICategory } from './category';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuestion } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  token: string;
  constructor(private http: HttpClient, private _tokenService: TokenService) { 
    this.token = _tokenService.getToken();
  }

  getQuestions(): Observable<IQuestion[]>{
    //console.log("kategorija iz servisa: " + kategorija);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };
    return this.http.get<IQuestion[]>('http://127.0.0.1:8000/rest/questions/', httpOptions);
  }

  createQuestion(category, pitanje, hint, tacanOdg){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };

     return this.http.post('http://127.0.0.1:8000/rest/questions/',{"category_id": category, "name": pitanje, "hint": hint, "answer": tacanOdg},httpOptions)
     
  }
  
}
