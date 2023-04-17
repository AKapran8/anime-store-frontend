import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';

import { HeaderComponent } from './components/header/header.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AngularMaterialModule } from 'src/app/shared/material.module';
import { AnimeModule } from './components/anime/anime.module';
import { HeroesComponent } from './components/heroes/heroes.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { HeroesListComponent } from './components/heroes/heroes-list/heroes-list.component';
import { AddEditHeroComponent } from './components/heroes/add-edit-hero/add-edit-hero.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DeleteDialogComponent,
    HeroesComponent,
    QuotesComponent,
    HeroesListComponent,
    AddEditHeroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    AnimeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
