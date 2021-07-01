import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TerminalService } from 'src/app/shared/services/terminal/terminal.service';
import { TerminalComponent } from '../terminal/terminal.component';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  codeText = "";
  cantLines = 0;
  cantLinesText = "Lineas: ";
  cont = 0;
  snippetsList = [];
  multiLines = "";
  flag = true;
  isError = false;
  textSize = 10;

  constructor(
    private _terminalService: TerminalService
  ) { }

  ngOnInit(): void {
    this._terminalService.updateErrorMessage(this.getError.bind(this))

  }

  getError(type:number) {
    if (type == 1){
      this.isError = true;

    }else{
        console.log("F");
    }
  }


  run() {
    this.snippetsList.push("cls");
    this.snippetsList.push(this.codeText);
    // this.calculateSnippets();
    this.validateSnippets();
    this.snippetsList = [];
  }

  resizeText(num:number){
    this.textSize+=num;
  }

  calculateSnippets() {
    let temp = this.codeText.split("\n");
    for (let i = 0; i < temp.length; i++) {
      //const element = temp[i];
     
      this.calculateSnippet(temp, i);
    }
  }

  calculateSnippet(temp:any[], index:number) {
   
    let line: string = temp[index];

    if(line !== ""){
      if (line.includes("{")) {
        this.cont += 1;
      }
  
      if ((line.includes("{")) && (!line.includes("}")) && (this.multiLines === "")) {
        this.flag = false;
        this.multiLines = this.multiLines + line;
      } else if (line.includes("}")) {
  
        this.multiLines = this.multiLines + line;
        this.cont -= 1;
        if (this.cont === 0) {
          this.flag = true;
          this.snippetsList.push(this.multiLines)
          this.multiLines = "";
        }
      } else {
        if (this.flag) {
          this.snippetsList.push(line)
        } else {
          this.multiLines = this.multiLines + line;
        }
      }

    }
    
  }

  /**
   * Envía todos los snippets al backend
   */
  validateSnippets(){
    for (let i = 0; i < this.snippetsList.length; i++) {
      const e = this.snippetsList[i];
      if(!this.isError){
        console.log(e);
        this._terminalService.validateSnippet(e, true);
      }

    }
  }

  calculateLines() {
    var rows = document.querySelector('textarea').value.split("\n").length;
    this.cantLines = rows;
    this.cantLinesText = "Lineas:" + this.cantLines;

  }

  onKeydown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      this.codeText += "\t";
    } else if (event.key === "Enter") {
      this.calculateLines();
    }
  }
}
