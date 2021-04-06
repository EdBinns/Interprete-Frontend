import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { TerminalService } from '../../shared/services/terminal/terminal.service'


@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})

export class TerminalComponent implements OnInit {

  previousLines = "";
  currentLine = "";
  multiLines = "";
  cont = 0;
  flag = true;

  constructor(
    private _terminalService: TerminalService
  ) { }

  ngOnInit(): void {
    this._terminalService.updateErrorMessage(this.getData.bind(this))
  }
  getData(type:number) {
    if (type == 1){
        console.log("no F")
        this.previousLines = this.previousLines + "\n" +this._terminalService.errorMessage;

    }else{
        console.log("F")
    }
  }
  onEnter() {
    let temp = this.currentLine.split("\n");
    let line: string;
    console.log("temp[1]", temp[1])
    line = this.currentLine.split("\n")[0];
    if (line.includes("{")) {
      this.cont += 1;
    }
    if ((line.includes("{")) && (!line.includes("}")) && (this.multiLines === "")) {
      this.flag = false;
      this.multiLines = this.multiLines + line;
      this.previousLines += "\n>>> " + line;
    } else if (line.includes("}")) {
      this.cont -= 1;
      if (line.includes("{")) {
        this.previousLines += "\n>>> " + line;
      } else {
        this.multiLines = this.multiLines + line;
        this.previousLines += "\n...> " + line;
      }

      if (this.cont === 0) {
        this.flag = true;
        this._terminalService.validateSnippet(this.multiLines);

        this.multiLines = "";
      }
    } else {
      if (this.flag) {
        this.previousLines += "\n>>> " + line;
        this._terminalService.validateSnippet(line);
  
      } else {
        this.multiLines = this.multiLines + line;
        this.previousLines += "\n...> " + line;

      }
    }
    this.currentLine = "";
    // falta mostrar el mensaje que devuelva el endpoint

  }

  onKeydown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      this.currentLine += "\t";
    } else if(event.key === "Enter"){
      event.preventDefault();
      this.onEnter();
    }
  }
}
