import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeComponent } from './components/anime/anime.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'anime', component: AnimeComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'quotes', component: QuotesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
