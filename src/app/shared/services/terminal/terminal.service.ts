import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReceiverSnippet } from '../../model/receiver-snippet';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  HTTPparams = new HttpParams();
  getSnippetTreeVar: (type: number) => void;
  public snippetTree = "";

  constructor(
    private _http: HttpClient,
  ) { }

  updateGetData(fn: (type:number) => void) { //función que sirrve para interactuar con el list.ts
    this.getSnippetTreeVar = fn
  }
  
  validateSnippet(snippet: string): any {
    const HTTPheaders = new HttpHeaders();
    this.HTTPparams = this.HTTPparams.set("snippet", snippet);
    return this._http.get<ReceiverSnippet>(`${environment.apiBaseUrl}validateSnippet/`, { headers: HTTPheaders, params: this.HTTPparams }).subscribe(
      response => {
        if (response.statusCode = 200) {
          this.getSnippetTreeVar(1);
          this.snippetTree = response.data;
          console.log(response);
        } else {
          // mensaje de gg
        }

      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

}
