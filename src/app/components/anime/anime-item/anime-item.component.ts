import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AnimeService } from '../service/anime.service';
import { IAnime } from '../anime.mode';

@Component({
  selector: 'app-anime-item',
  templateUrl: './anime-item.component.html',
  styleUrls: ['./anime-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeItemComponent implements OnInit {
  private _id: string = '';

  public anime: IAnime | null = null;
  public errorMessage: string = '';

  constructor(
    private _cdr: ChangeDetectorRef,
    private _animeService: AnimeService,
    private _route: ActivatedRoute,
    private _router: Router
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
    this._animeService
      .getAnimeById(this._id)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.anime = res.anime;
          this._cdr.markForCheck();
        },
        (err) => {
          this.errorMessage =
            err?.error?.message || 'You must be logged first to see this page';
          this._cdr.markForCheck();
        }
      );
  }

  public navigateToLogin(): void {
    this._router.navigate(['login']);
  }
}
