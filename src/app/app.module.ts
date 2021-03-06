import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { DndModule }     from 'ng2-dnd';

import { AppService } from './app.service';
import { AppComponent }  from './app.component';
import { TopComponent }  from './top.component';
import { NextTripsComponent }  from './next-trips.component';
import { NextDeparturesComponent }  from './next-departures.component';
import { AddCardComponent }  from './add-card.component';
import { AddStationCardComponent }  from './add-station-card.component';
import { AddTripCardComponent }  from './add-trip-card.component';
import { InformationComponent } from './info.component'

import { SLHttpService } from './http.service';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CardStorageService } from './cardstorage.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    DndModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    TopComponent,
    NextTripsComponent,
    NextDeparturesComponent,
    AddCardComponent,
    AddStationCardComponent,
    AddTripCardComponent,
    InformationComponent,
  ],
  providers:[
    AppService,
    SLHttpService,
    CookieService,
    CardStorageService,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
