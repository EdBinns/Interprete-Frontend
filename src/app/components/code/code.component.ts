import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

  run() {

    console.log(this.codeText)
  }
  calculateLines() {
    var rows = document.querySelector('textarea').value.split("\n").length;

    this.cantLines = rows;
    this.cantLinesText = "Lineas:" + this.cantLines;


    let temp = this.codeText.split("\n");
    let line: string = temp[rows - 1];
    if (line.includes("{")) {
      this.cont += 1;
    }

    if ((line.includes("{")) && (!line.includes("}") )&& (this.multiLines === "")) {
      this.flag = false;
      this.multiLines = this.multiLines + line;
    } else if (line.includes("}")) {

      this.multiLines = this.multiLines + line;
      this.cont -= 1;
      if( this.cont === 0){
        this.flag = true;
        this.snippetsList.push(this.multiLines )
        this.multiLines = "";
      }
    } else {
      if (this.flag) {
        this.snippetsList.push(line)
      } else {
        this.multiLines = this.multiLines + line;
      }
    }
    console.log(this.snippetsList)

  }
}
