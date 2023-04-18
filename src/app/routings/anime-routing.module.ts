import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeComponent } from '../components/anime/anime.component';
import { AnimeItemComponent } from '../components/anime/anime-item/anime-item.component';

const routes: Routes = [
  { path: '', component: AnimeComponent },
  { path: ':id', component: AnimeItemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}
