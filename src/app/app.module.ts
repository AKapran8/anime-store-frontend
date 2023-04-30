import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app-component/app.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { HeaderComponent } from './components/header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { HomeModule } from './components/home/home.module';
import { AnimeModule } from './components/anime/anime.module';
import { HeroesModule } from './components/heroes/heroes.module';
import { QuotesModule } from './components/quotes/quotes.module';
import { AuthModule } from './components/auth/auth.module';

import { AuthGuard } from './components/auth/auth.guard';
import { AuthInterceptor } from './components/auth/token-interceptor';
import { ErrorInterceptor } from './components/error/error-interceptor';

@NgModule({
  declarations: [AppComponent, DeleteDialogComponent, HeaderComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    AnimeModule,
    HeroesModule,
    QuotesModule,
    HomeModule,
    AuthModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
