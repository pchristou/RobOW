import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class DialogflowService {

  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  private token: string = environment.token;

  constructor(private http: HttpClient) {}

  public getResponse(query: string){
    let data = {
      query : query,
      lang: 'en',
      sessionId: '12345'
    }

    return this.http.post(`${this.baseURL}`, data, {headers: this.getHeaders()})
      .pipe(
        map(res => res)
      )
  }

  public getHeaders(){

    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    
  }
}