import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { TopComponent }  from './top.component';
import { CompactDeparturesComponent }  from './compact-departures.component';
import { NextDeparturesComponent }  from './next-departures.component';
import { AddCardComponent }  from './add-card.component';

import { SLHttpService } from './http.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [
    AppComponent,
    TopComponent,
    CompactDeparturesComponent,
    NextDeparturesComponent,
    AddCardComponent,
  ],
  providers:[
      SLHttpService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
