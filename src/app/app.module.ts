import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AnimeComponent } from './components/anime/anime.component';
import { AddAnimeComponent } from './components/anime/add-anime/add-anime.component';
import { HomeComponent } from './components/home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { StarsIconsComponent } from './components/anime/stars-icons/stars-icons.component';
@NgModule({
  declarations: [
    AppComponent,
    AnimeComponent,
    AddAnimeComponent,
    HomeComponent,
    HeaderComponent,
    ConfirmDialogComponent,
    StarsIconsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatExpansionModule,
    HttpClientModule
  ],
  exports: [StarsIconsComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
