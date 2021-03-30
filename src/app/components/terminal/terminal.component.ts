import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  previousLines = "";
  currentLine = "";

  constructor() { }

  ngOnInit(): void {
  }

  onEnter() {
    let temp = this.currentLine.split("\n");
    if (temp[1] == undefined) {
      this.previousLines += "\n>>> " + (this.currentLine.split("\n"))[0];
    } else {
      this.previousLines += "\n>>> " + (this.currentLine.split("\n"))[1];
    }
    this.currentLine = "";
  }

}
