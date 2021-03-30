import { Component, OnInit } from '@angular/core';
import { TerminalService } from '../../shared/services/terminal/terminal.service'

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  previousLines = "";
  currentLine = "";

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
    this.previousLines += "\n>>> " + line;
    this._terminalService.sendLine(line);
    // falta mostrar el mensaje que devuelva el endpoint
    this.currentLine = "";
  }

}
