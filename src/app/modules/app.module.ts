import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../routings/app-routing.module';
import { CommonModule } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from '../app-component/app.component';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { HeaderComponent } from '../components/header/header.component';

import { HomeModule } from '../components/home/home.module';
import { AngularMaterialModule } from './material.module';
import { AnimeModule } from '../components/anime/anime.module';
import { HeroesModule } from '../components/heroes/heroes.module';
import { QuotesModule } from '../components/quotes/quotes.module';
import { AuthModule } from '../components/auth/auth.module';

@NgModule({
  declarations: [AppComponent, DeleteDialogComponent, HeaderComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AngularMaterialModule,
    AnimeModule,
    HeroesModule,
    QuotesModule,
    HomeModule,
    AuthModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
