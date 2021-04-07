import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TerminalService } from 'src/app/shared/services/terminal/terminal.service';

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

  constructor(
    private _terminalService: TerminalService
  ) { }

  ngOnInit(): void {
  }

  run() {
    console.log(this.codeText);
    this.calculateSnippets();
    this.validateSnippets();
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
    console.log(this.snippetsList);
  }

  /**
   * Envía todos los snippets al backend
   */
  validateSnippets(){
    for (let i = 0; i < this.snippetsList.length; i++) {
      const e = this.snippetsList[i];
      console.log("e",e);
      this._terminalService.validateSnippet(e);
    }
  }

  calculateLines() {
    var rows = document.querySelector('textarea').value.split("\n").length;

    var someString: string = "{\n  \"program\": [\n    {\n      \"statement\": [\n        {\n          \"variableDecl\": [\n            {\n              \"type\": [\n                {\n                  \"simpleType\": [\n                    {\n                      \"name\": \"INT\",\n                      \"text\": \"int\"\n                    }\n                  ]\n                }\n              ]\n            },\n            {\n              \"name\": \"ID\",\n              \"text\": \"x\"\n            },\n            {\n              \"name\": \"ASYGN\",\n              \"text\": \"=\"\n            },\n            {\n              \"expression\": [\n                {\n                  \"simpleExpression\": [\n                    {\n                      \"term\": [\n                        {\n                          \"factor\": [\n                            {\n                              \"name\": \"LITERAL\",\n                              \"text\": \"3\"\n                            }\n                          ]\n                        }\n                      ]\n                    }\n                  ]\n                }\n              ]\n            }\n          ]\n        },\n        {\n          \"name\": \"PyCOMA\",\n          \"text\": \";\"\n        }\n      ]\n    },\n    {\n      \"text\": \"EOF\"\n    }\n  ]\n}";
    var jsonObject: any = JSON.parse(someString)
    console.log(jsonObject)
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
