import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HomeComponent } from './components/home/home.component';

import { HeaderComponent } from './components/header/header.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AngularMaterialModule } from 'src/app/shared/material.module';
import { AnimeModule } from './components/anime/anime.module';
import { HeroesComponent } from './components/heroes/heroes.component';
import { QuotesComponent } from './components/quotes/quotes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DeleteDialogComponent,
    HeroesComponent,
    QuotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    AnimeModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
