import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeItemComponent } from 'src/app/components/anime/anime-item/anime-item.component';
import { AnimeComponent } from 'src/app/components/anime/anime.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { HeroesComponent } from 'src/app/components/heroes/heroes.component';
import { QuotesComponent } from 'src/app/components/quotes/quotes.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';

import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'anime', component: AnimeComponent },
  { path: 'anime/:id', component: AnimeItemComponent },
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard] },
  { path: 'quotes', component: QuotesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
