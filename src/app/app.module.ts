import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { TimeagoModule } from 'ngx-timeago';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ItemsComponent } from './components/items/items.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: ItemsComponent },
  { path: 'top', component: ItemsComponent },
  { path: 'best', component: ItemsComponent },
  { path: 'new', component: ItemsComponent },
  { path: 'ask', component: ItemsComponent },
  { path: 'show', component: ItemsComponent },
  { path: 'jobs', component: ItemsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItemsComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    TimeagoModule.forRoot(),
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
