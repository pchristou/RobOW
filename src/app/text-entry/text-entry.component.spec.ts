import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MessagesPaneComponent } from '../messages-pane/messages-pane.component';

import { AppComponent } from '../app.component';

import { By } from '@angular/platform-browser';


import { TextEntryComponent } from './text-entry.component';
import { UserService } from './user.service';

import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/defer"

import { MatListModule } from '@angular/material/list';

import { NO_ERRORS_SCHEMA } from '@angular/core';

class UserServiceStubbio {
  typing() : string {
    return 'stub';
  }
}

class DummyData {
    
  getDummyMessages() {
      return [
          { message: 'This is a test 1', sender: 'user' },
          { message: 'This is a test 2', sender: 'user' },
          { message: 'This is a test 3', sender: 'user' },
          { message: 'This is a test 4', sender: 'robow' },
          { message: 'This is a test 5', sender: 'user' },
          { message: 'This is a test 6', sender: 'robow' },
          { message: 'This is a test 7', sender: 'robow' },
          { message: 'This is a test 8', sender: 'user' },
          { message: 'This is a test 9', sender: 'user' }
        ];
  }
}

describe('TextEntryComponent', () => {

  let appFixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  let messagesFixture: ComponentFixture<MessagesPaneComponent>;
  let messagesComponent: MessagesPaneComponent;

  let textFixture: ComponentFixture<TextEntryComponent>;  
  let textComponent: TextEntryComponent;
  let user: UserService | any;
  
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ TextEntryComponent, MessagesPaneComponent, AppComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ MatListModule ],
      //providers: [ { provide: UserService, useClass: UserServiceStubbio } ]
      //providers: [ { provide: UserService, useValue: user } ]
      providers: [ UserService, DummyData ]
    })
    .compileComponents();

    textFixture = TestBed.createComponent(TextEntryComponent);
    textComponent = textFixture.componentInstance;
    textFixture.detectChanges();

  }));

  it('should create', () => {
    expect(textComponent).toBeTruthy();
  });

  /* Create async observable that emits-once and completes
     after a JS engine turn 
  */
  function asyncData<T>(data: T) {
    return Observable.defer(() => Promise.resolve(data));
  }
  
  // CORE FLOW - should go in the smart component
  it('pressing <Enter> with a message, should cause it to be added to the list of existing messages', () => {

    let dummyData = new DummyData();

    appFixture = TestBed.createComponent(AppComponent);
    appComponent = appFixture.componentInstance;
    appFixture.detectChanges();

    const textComponent : TextEntryComponent = appFixture.debugElement
    .query(By.directive(TextEntryComponent))
    .componentInstance;   

    const messagesComponent : MessagesPaneComponent = appFixture.debugElement
    .query(By.directive(MessagesPaneComponent))
    .componentInstance;   

    appFixture.detectChanges();

    let messageText = 'My written message';
    textComponent.text.nativeElement.value = messageText;

    spyOn(textComponent.messageSent, 'emit').and.callThrough();
    spyOn(appComponent, 'addToMessagePane').and.callThrough();
    
    var data = {
      key: 'Enter',
      keyIdentifier:'NumbpadEnter',
      keyCode: 13
   };

    let kbEvent = new KeyboardEvent('keyup', data);
   
    appFixture.detectChanges(); 

    let messageCount = messagesComponent.lines.length; // store this before we add a message
    textComponent.addMessage(kbEvent);

    // verify the eventEmitter was called
    expect(textComponent.messageSent.emit).toHaveBeenCalledWith(messageText);

    expect(appComponent.addToMessagePane).toHaveBeenCalled();

    appFixture.detectChanges();

    expect(messagesComponent.lines.length).toBe(messageCount + 1);

  })

  // IT IS ASSUMED THAT ONCE A MESSAGE HAS BEEN ADDED AKA EVENT HAS BEEN EMITTED, THIS COMPONENT HAS DONE ITS JOB 
  it('upon a message being emitted, the cursor should reset and go back to the beginning', () => {
            
        let textEntry : HTMLTextAreaElement = textFixture.debugElement.nativeElement.querySelector('.textEntry');  
        let message = 'My written message';
    
        emitMessage(textEntry, message);
    
        // verify the eventEmitter was called
        expect(textComponent.messageSent.emit).toHaveBeenCalledWith(message);

        // should be zero since cursor should be at start
        expect(textEntry.selectionStart).toBe(0);
  })




  it('upon a message being emitted, the current contents of the textbox should disappear', () => {

        let textEntry : HTMLTextAreaElement = textFixture.debugElement.nativeElement.querySelector('.textEntry');  
        let message = 'My written message';

        emitMessage(textEntry, message);

        // verify the eventEmitter was called
        expect(textComponent.messageSent.emit).toHaveBeenCalledWith(message);

        // should be zero since text area should now be empty
        expect(textEntry.value.length).toBe(0);

  })

  it('pressing <Enter> should do nothing if no message is detected', () => {

        let textEntry : HTMLTextAreaElement = textFixture.debugElement.nativeElement.querySelector('.textEntry');  
        // only add the item to list if the message has alpha numeric characters
        let message = '      ';

        emitMessage(textEntry, message);

        // verify the eventEmitter was NOT called given we've fed the textbox a blank message
        expect(textComponent.messageSent.emit).not.toHaveBeenCalled();
  })

  it('pressing <Enter> should cause the event emitter to fire', () => {
    
        let textEntry : HTMLTextAreaElement = textFixture.debugElement.nativeElement.querySelector('.textEntry');  
        let message = 'My written message';

        emitMessage(textEntry, message);
          
        expect(textComponent.messageSent.emit).toHaveBeenCalledWith(message);

  });

  function emitMessage(textBox, message) {
    
        let textEntry : HTMLTextAreaElement = textFixture.debugElement.nativeElement.querySelector('.textEntry');  
        // let textEntry : HTMLTextAreaElement = textComponent.text.nativeElement;
         
         // inject a string value to the text area
         textEntry.value = message;
         
         // ensure bindings are updated
         textFixture.detectChanges(); 
         
         // spy on the emitter
         spyOn(textComponent.messageSent, 'emit').and.callThrough();
         
         var data = {
           key: 'Enter',
           keyIdentifier:'NumbpadEnter',
           keyCode: 13
         };
     
         // pass the enter key event
         let kbEvent = new KeyboardEvent('keyup', data);
         textComponent.addMessage(kbEvent);
      }

});
