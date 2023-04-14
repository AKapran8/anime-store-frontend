import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { take } from 'rxjs/operators';

import { AnimeService } from '../../anime/service/anime.service';
import { HeroesService } from '../service/heroes.service';
import { IHero } from '../model.hero';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesListComponent implements OnInit {
  public heroes: IHero[] = [];

  constructor(
    private _cdr: ChangeDetectorRef,
    private _heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this._getHeroes();
    this._heroesService.getHeroesss().subscribe((res) => {
      console.log(res);
    });
  }

  private _getHeroes(): void {
    this._heroesService
      .getHeroes()
      .pipe(take(1))
      .subscribe((res) => {
        this.heroes = res?.data;
        this._cdr.markForCheck();
      });
  }

  public removeHero(id: string): void {
    this._heroesService
      .deleteHero(id)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
      });
  }
}
