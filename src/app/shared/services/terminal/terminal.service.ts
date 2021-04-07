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
  getErrorMessage: (type: number) => void;
  public snippetTree = {};
  public errorMessage = "";

  constructor(
    private _http: HttpClient,
  ) { }

  updateGetData(fn: (type: number) => void) { //función que sirrve para interactuar con el tree.ts
    this.getSnippetTreeVar = fn
  }
  
  updateErrorMessage(fn: (type: number) => void) { //función que sirrve para interactuar con el tree.ts
    this.getErrorMessage = fn
  }

  validateSnippet(snippet: string) {
    const HTTPheaders = new HttpHeaders();
    this.HTTPparams = this.HTTPparams.set("snippet", snippet);
    this._http.get<ReceiverSnippet>(`${environment.apiBaseUrl}validateSnippet/`, { headers: HTTPheaders, params: this.HTTPparams }).subscribe(
      response => {
        console.log("response", response);
        if (response.statusCode == 200) {
          this.snippetTree = JSON.parse(response.data);
          this.getSnippetTreeVar(1);
        } else {
          // mensaje de gg
          this.errorMessage = response.data;
          this.getErrorMessage(1);
          console.log("ggg");
        }

      },
      (err: HttpErrorResponse) => {
        console.log("error");
        console.log(err);
      }
    );
  }

}
