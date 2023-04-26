import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AnimeComponent } from './anime.component';
import { AddAnimeComponent } from './add-anime/add-anime.component';
import { AnimeItemComponent } from './anime-item/anime-item.component';
import { StarsIconsComponent } from './stars-icons/stars-icons.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AnimeService } from './service/anime.service';

@NgModule({
  declarations: [
    AnimeComponent,
    AddAnimeComponent,
    StarsIconsComponent,
    AnimeItemComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [StarsIconsComponent],
  providers: [AnimeService],
})
export class AnimeModule {}
