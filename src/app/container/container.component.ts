import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";

import { DialogflowService } from '../service/dialogflow.service'

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(private dialogFlowService : DialogflowService) {}
  
    messages$ : Observable<any>; // "line" item made up of "message" and "sender"
    
    ngOnInit() {
  
      this.messages$ = Observable.of([
        { message: 'Hi, RobOW here. How may I help you today?', sender: 'robow' },
      ]);
  
    }
  
    addToMessagePane(message) {
  
      this.messages$.subscribe(messages => { 
  
        this.dialogFlowService.getResponse(message).subscribe((res : any) => {
          
          messages.push({ message: message, sender: 'user' });
          messages.push({ message: res.result.fulfillment.speech, sender: 'robow' });
          
        });
      });
  
    }
}
