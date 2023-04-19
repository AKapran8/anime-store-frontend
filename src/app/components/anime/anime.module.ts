import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AnimeComponent } from './anime.component';
import { AddAnimeComponent } from './add-anime/add-anime.component';
import { AnimeItemComponent } from './anime-item/anime-item.component';
import { StarsIconsComponent } from './stars-icons/stars-icons.component';

import { AngularMaterialModule } from '../../modules/material.module';

import { AnimeService } from './service/anime.service';

@NgModule({
  declarations: [
    AnimeComponent,
    AddAnimeComponent,
    StarsIconsComponent,
    AnimeItemComponent,
  ],
  imports: [AngularMaterialModule, BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule],
  exports: [StarsIconsComponent],
  providers: [AnimeService],
})
export class AnimeModule {}
