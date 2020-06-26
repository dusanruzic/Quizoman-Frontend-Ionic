import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  token: string;
  constructor(private http: HttpClient, private _tokenService: TokenService) { 
    this.token = _tokenService.getToken();
  }

  getCategories(): Observable<ICategory[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };
    
    return this.http.get<ICategory[]>('http://127.0.0.1:8000/rest/categories/', httpOptions);
  }
}
