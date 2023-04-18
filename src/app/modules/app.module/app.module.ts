import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../routings/app.routing/app-routing.module';

import { AppComponent } from '../../app-component/app.component';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
import { HeaderComponent } from '../../components/header/header.component';

import { HomeModule } from '../home.module';
import { HelpModule } from 'src/app/modules/another/help.module';
import { AnimeModule } from '../anime.module';
import { HeroesModule } from '../heroes.module';
import { QuotesModule } from '../quotes.module';

@NgModule({
  declarations: [AppComponent, DeleteDialogComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HelpModule,
    AnimeModule,
    HeroesModule,
    QuotesModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
