import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  HTTPparams = new HttpParams();

  constructor(
    private _http: HttpClient,
  ) { }

  sendLine(line:string){
    
  }
  
}
