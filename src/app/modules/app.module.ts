import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../routings/app-routing.module';
import { CommonModule } from '@angular/common';

import { AppComponent } from '../app-component/app.component';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { HeaderComponent } from '../components/header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HomeModule } from '../components/home/home.module';
import { AnimeModule } from '../components/anime/anime.module';
import { HeroesModule } from '../components/heroes/heroes.module';
import { QuotesModule } from '../components/quotes/quotes.module';

@NgModule({
  declarations: [AppComponent, DeleteDialogComponent, HeaderComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    AnimeModule,
    HeroesModule,
    QuotesModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
