import { NgModule } from '@angular/core';

import { AnimeComponent } from '../components/anime/anime.component';
import { AddAnimeComponent } from '../components/anime/add-anime/add-anime.component';
import { StarsIconsComponent } from '../components/anime/stars-icons/stars-icons.component';

import { HelpModule } from 'src/app/modules/another/help.module';
import { AnimeRoutingModule } from '../routings/anime-routing.module';

import { AnimeService } from '../services/anime/anime.service';

@NgModule({
  declarations: [
    AnimeComponent,
    AddAnimeComponent,
    StarsIconsComponent,
  ],
  imports: [
    HelpModule,
    AnimeRoutingModule
  ],
  exports: [StarsIconsComponent],
  providers: [AnimeService],
})
export class AnimeModule {}
