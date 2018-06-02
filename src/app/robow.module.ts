import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ContainerComponent } from './container/container.component';
import { MessagesPaneComponent } from './messages-pane/messages-pane.component';
import { TextEntryComponent } from './text-entry/text-entry.component';

import { MaterialLoaderModule } from './material/material-loader.module';

import { DialogflowService } from './service/dialogflow.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,        
        MaterialLoaderModule
    ],
    exports: [
        ContainerComponent,
        MessagesPaneComponent,
        TextEntryComponent,
        MaterialLoaderModule      
    ],
    declarations: [  
        ContainerComponent,  
        MessagesPaneComponent,
        TextEntryComponent
    ],
    providers: [ 
        DialogflowService 
    ]
})
export class RobowModule { }
