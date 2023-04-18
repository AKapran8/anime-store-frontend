import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeRoutingModule } from '../home-routing.module';
import { AnimeRoutingModule } from '../anime-routing.module';
import { HeroesRoutingModule } from '../heroes-routing.module';
import { QuotesRoutingModule } from '../quotes-routing.module';

const routes: Routes = [
  { path: '', loadChildren: () => HomeRoutingModule },
  { path: 'anime', loadChildren: () => AnimeRoutingModule },
  { path: 'heroes', loadChildren: () => HeroesRoutingModule },
  { path: 'quotes', loadChildren: () => QuotesRoutingModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
