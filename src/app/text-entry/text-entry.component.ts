import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { map, filter, switchMap, flatMap, startWith } from "rxjs/operators";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-text-entry',
  templateUrl: './text-entry.component.html',
  styleUrls: ['./text-entry.component.css']
})
export class TextEntryComponent implements OnInit {

  @ViewChild('textField') text : ElementRef;
  @Output() messageSent = new EventEmitter();

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    
      iconRegistry.addSvgIcon(
        'robow_logo_small',
        sanitizer.bypassSecurityTrustResourceUrl('assets/images/robow_logo_small.svg')
      );
      iconRegistry.addSvgIcon(
        'robow_logo_small_disabled',
        sanitizer.bypassSecurityTrustResourceUrl('assets/images/robow_logo_small_disabled.svg')
      );
  }

  ngOnInit() {

    // set up event observables
    Observable.fromEvent(
      this.text.nativeElement, 'keyup').subscribe(
        ($event : KeyboardEvent) => { this.addMessageOnEnter($event); }
    );

    Observable.fromEvent(
      this.text.nativeElement, 'keydown').subscribe(
        ($event : KeyboardEvent) => { this.ignoreNewline($event); }
    );

  }

  addMessageOnEnter(event : KeyboardEvent) {
    
        if((event.which == 13 || event.keyCode == 13)) {
          this.addMessage();   
        }
  }

  addMessage() {
    
            let message : string = this.text.nativeElement.value.trim();
        
            if(message.length > 0) {
          
              this.messageSent.emit(message);
              // put cursor position back to start
              this.resetCursor(this.text.nativeElement);
              // remove text content now message has been submitted
              this.text.nativeElement.value = "";
            }
  }

  ignoreNewline(event : KeyboardEvent) {

    if(event.which == 13 || event.keyCode == 13) {
      event.preventDefault();
    }

  }

  resetCursor(txtElement) { 
    
        if (txtElement.setSelectionRange) { 
            txtElement.focus(); 
            txtElement.setSelectionRange(0, 0); 
        } else if (txtElement.createTextRange) { 
            var range = txtElement.createTextRange();  
            range.moveStart('character', 0); 
            range.select(); 
        } 
  }
}