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
  }

  onEnter() {
    let temp = this.currentLine.split("\n");
    let line: string;
    console.log("temp[1]", temp[1])
    if (temp[1] == undefined || temp[1].length == 0) {
      line = this.currentLine.split("\n")[0];
    } else {
      line = this.currentLine.split("\n")[1];
    }
    if(line.includes("{")){
      this.cont += 1;
    }
    if ((line.includes("{")) && (!line.includes("}")) && (this.multiLines === "")) {
      this.flag = false;
      this.multiLines = this.multiLines + line;
      this.previousLines += "\n>>> " + line;
    }else if( line.includes("}")){
      this.cont -= 1;
      if(line.includes("{") ){
        this.previousLines += "\n>>> " + line;
      }else{
        this.multiLines = this.multiLines + line;
        this.previousLines += "\n...> " + line ;    
      }

      if( this.cont === 0){
        this.flag = true;
        this._terminalService.sendLine(this.multiLines);
        this.multiLines = "";
      }
    }else{
      if(this.flag){
        this.previousLines += "\n>>> " + line;
      this._terminalService.sendLine(line);
      }else{
        this.multiLines = this.multiLines + line;
        this.previousLines += "\n...> " + line;
      }  
    }
    this.currentLine = "";
    // falta mostrar el mensaje que devuelva el endpoint

  }

}
