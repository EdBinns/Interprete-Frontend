import { Component, OnInit } from '@angular/core';
import { TerminalService } from 'src/app/shared/services/terminal/terminal.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';


@Component({
    selector: 'app-trees',
    templateUrl: './trees.component.html',
    styleUrls: ['./trees.component.css']
})
export class TreesComponent implements OnInit {

    data = {};
    
    constructor(
        private _terminalService: TerminalService
    ) { }

    ngOnInit(): void {
        // this._terminalService.updateGetData(this.getData.bind(this))
    }

    getData(type: number) {
        if (type == 1) {
          
            // this.data = this._terminalService.snippetTree;
        } else {
            console.log("F")
        }
    }

    // var someString: string = "{\n  \"program\": [\n    {\n      \"statement\": [\n        {\n          \"variableDecl\": [\n            {\n              \"type\": [\n                {\n                  \"simpleType\": [\n                    {\n                      \"name\": \"INT\",\n                      \"text\": \"int\"\n                    }\n                  ]\n                }\n              ]\n            },\n            {\n              \"name\": \"ID\",\n              \"text\": \"x\"\n            },\n            {\n              \"name\": \"ASYGN\",\n              \"text\": \"=\"\n            },\n            {\n              \"expression\": [\n                {\n                  \"simpleExpression\": [\n                    {\n                      \"term\": [\n                        {\n                          \"factor\": [\n                            {\n                              \"name\": \"LITERAL\",\n                              \"text\": \"3\"\n                            }\n                          ]\n                        }\n                      ]\n                    }\n                  ]\n                }\n              ]\n            }\n          ]\n        },\n        {\n          \"name\": \"PyCOMA\",\n          \"text\": \";\"\n        }\n      ]\n    },\n    {\n      \"text\": \"EOF\"\n    }\n  ]\n}";
    // var jsonObject: any = JSON.parse(someString)
    // console.log(jsonObject)

    get code() {
        return JSON.stringify(this.data, null, 2);
    }

    set code(v) {
        try {
            this.data = JSON.parse(v);
        }
        catch (e) {
            console.log('error occored while you were typing the JSON');
        };
    }
}