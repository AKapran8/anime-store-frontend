import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AnimeComponent } from './anime.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { AddAnimeComponent } from './add-anime/add-anime.component';
import { StarsIconsComponent } from './anime-list/stars-icons/stars-icons.component';

import { AngularMaterialModule } from 'src/app/shared/material.module';

import { AnimeService } from './service/anime.service';
@NgModule({
  declarations: [
    AnimeComponent,
    AnimeListComponent,
    AddAnimeComponent,
    StarsIconsComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [StarsIconsComponent],
  providers: [AnimeService],
})
export class AnimeModule {}
