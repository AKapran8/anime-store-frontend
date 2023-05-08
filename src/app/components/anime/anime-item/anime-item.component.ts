import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';

import { AnimeService } from '../service/anime.service';
import { IAnimeById } from '../anime.model';
import { startDescriptionEnum } from '../custom.pipes';

@Component({
  selector: 'app-anime-item',
  templateUrl: './anime-item.component.html',
  styleUrls: ['./anime-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeItemComponent implements OnInit {
  public isLoading: boolean = false;
  private _id: string = '';

  public anime: IAnimeById | null = null;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _animeService: AnimeService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initComponent();
  }

  private _initComponent(): void {
    this._route.params.pipe(take(1)).subscribe((res: Params) => {
      if (res?.['id']) {
        this._id = res['id'];
        this._getAnime();
      }
    });
  }

  private _getAnime(): void {
    this.isLoading = true;
    this._cdr.markForCheck();
    this._animeService
      .getAnimeById(this._id)
      .pipe(take(1))
      .subscribe((res) => {
        this.anime = {
          ...res.anime,
          startDescr: startDescriptionEnum[res.anime.stars - 1],
        };
        this.isLoading = false;
        this._cdr.markForCheck();
      });
  }
}
