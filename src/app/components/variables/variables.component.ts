import { Component, OnInit } from '@angular/core';
import { TerminalService } from 'src/app/shared/services/terminal/terminal.service';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {

  constructor( public _terminalService: TerminalService) { 
    
  }

  ngOnInit(): void {
  }

}
