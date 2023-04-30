import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeItemComponent } from 'src/app/components/anime/anime-item/anime-item.component';
import { AnimeComponent } from 'src/app/components/anime/anime.component';
import { HomeComponent } from 'src/app/components/home/home.component';

import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'anime', component: AnimeComponent },
  {
    path: 'anime/:id',
    component: AnimeItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./components/heroes/heroes.module').then((m) => m.HeroesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'quotes',
    loadChildren: () =>
      import('./components/quotes/quotes.module').then((m) => m.QuotesModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
