import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-messages-pane',
  templateUrl: './messages-pane.component.html',
  styleUrls: ['./messages-pane.component.css']
})
export class MessagesPaneComponent implements OnInit {
  
  @Input() lines : Array<any>; // "line" item made up of "message" and "sender"

  ngOnInit() {}
}
