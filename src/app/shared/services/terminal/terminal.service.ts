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
  public tables = "";
  public errorMessage = "";
  public previousTerminalLines = "";

  constructor(
    private _http: HttpClient,
  ) { }

  updateGetData(fn: (type: number) => void) { //función que sirve para interactuar con el tree.ts
    this.getSnippetTreeVar = fn
  }

  updateErrorMessage(fn: (type: number) => void) { //función que sirrve para interactuar con el tree.ts
    this.getErrorMessage = fn
  }

  validateSnippet(snippet: string, isCodeComponent: boolean) {
    const HTTPheaders = new HttpHeaders();

    //snippet = snippet.replace('+', "!!!");
    // se hace un replaceAll al + por que el símbolo + no llega al backend
    if(snippet === "cls"){
      this.tables = "";
    }
    snippet = snippet.split('+').join('!!!');
    console.log("envio", snippet);

    this.HTTPparams = this.HTTPparams.set("snippet", snippet);
    this._http.get<ReceiverSnippet>(`${environment.apiBaseUrl}validateSnippet/`, { headers: HTTPheaders, params: this.HTTPparams }).subscribe(
      response => {
        console.log("response", response);
        if (response.statusCode == 200) {
          this.tables = response.data;
          this.getSnippetTreeVar(1);
          let message="";
          if (isCodeComponent) {
            // limpia la terminal
            this.previousTerminalLines = "";
            message = "¡Compilación terminada!";
          } else {
            message = "No hay errores"
          }
          this.showMessage(message);
        } else {
          // mensaje de gg
          this.showMessage(response.data);
        }

      },
      (err: HttpErrorResponse) => {
        console.log("error", err);
        this.showMessage(err.message);
      }
    );
  }

  showMessage(message:string){
    this.errorMessage = message;
    this.getErrorMessage(1);
  }
}

