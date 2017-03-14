import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import 'hammerjs';
// import { LocalStorageService } from 'angular2-localstorage';

import { SERVICES } from './service';
import { AppComponent, DialogComponent, UserService, DialogService, LoaderService, NavigatorService, MenuService } from '@ts-webapp/front';
import { COMPONENTS, ENTRY_COMPONENTS } from './component';
import { ROUTES } from './route';
import { MODELS } from './db';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    ...COMPONENTS,
    ...ENTRY_COMPONENTS,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ROUTES,

    MaterialModule,
    // WebStorageModule,
  ],
  entryComponents: [
    DialogComponent,
    ...ENTRY_COMPONENTS
  ],
  providers: [
      UserService,
      DialogService,
      LoaderService,
      NavigatorService,
      MenuService,
    // LocalStorageService,
    ...SERVICES,
    ...MODELS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }