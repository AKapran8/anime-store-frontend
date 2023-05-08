import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';

import { AnimeService } from '../service/anime.service';
import { IAnimeElement } from '../anime.model';
import { ratingDescriptionEnum } from '../custom.pipes';

@Component({
  selector: 'app-anime-item',
  templateUrl: './anime-item.component.html',
  styleUrls: ['./anime-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeItemComponent implements OnInit {
  public isLoading: boolean = false;
  private _id: string = '';

  public anime: IAnimeElement | null = null;

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
      .subscribe({
        next: (res) => {
          this.anime = {
            ...res.anime,
            startDescr: ratingDescriptionEnum[res.anime.stars - 1],
          };
        },
        error: (err) => {},
        complete: () => {
          this.isLoading = false;
          this._cdr.markForCheck();
        },
      });
  }
}
