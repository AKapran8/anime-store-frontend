import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAnimeComponent } from './add-anime/add-anime.component';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AnimeService } from './service/anime.service';
import { take, map } from 'rxjs/operators';
import { IAddEditAnime, IAnime, IServerAnime, ITableData } from './model';
import { convertTimeToText, getStarsDescription } from './anime.functions';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent implements OnInit, OnDestroy {
  public animeCount: number = 0;
  public searchControl: FormControl | null = null;
  private _animeList: IAnime[] = [];
  public animeList: ITableData[] = [];

  private _searchValueChangesSub: Subscription | null = null;
  constructor(
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    private _animeService: AnimeService
  ) {}

  ngOnInit(): void {
    this._getAnimeList();
    this._initSearchControl();
  }

  private _getAnimeList(): void {
    this._animeService
      .getAnimeList()
      .pipe(
        map((animeData) => {
          return this._mapAnimeListData(animeData.data);
        }),
        take(1)
      )
      .subscribe((res) => {
        if (res) {
          this._animeList = [...res];

          this._modifyList();
        }
      });
  }

  private _modifyList(): void {
    this.animeList = this._animeList.map((a) => {
      const starsDescr = getStarsDescription(a.stars - 1);
      const timeText = convertTimeToText(a.time);
      return {
        ...a,
        starsDescr,
        timeText,
      };
    });

    this.animeCount = this.animeList.length;
    this._cdr.markForCheck();
  }

  private _initSearchControl(): void {
    this.searchControl = new FormControl('');

    this._searchValueChangesSub = this.searchControl?.valueChanges.subscribe(
      (inputValue: string) => {
        console.log(inputValue);
      }
    );
  }

  public addAnime(): void {
    const dialogRef = this._dialog.open(AddAnimeComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.createdAnime) {
        const newElem: IAnime = this._getNewAnimeItem(res.createdAnime);
        this._animeList.push(newElem);
        this._modifyList();
      }
    });
  }

  public editAnime(row: ITableData): void {
    const editRow: IAddEditAnime = {
      name: row.name,
      nameUA: row.nameUA,
      stars: row.stars,
      time: row.time,
      genres: row.genres,
      status: row.status,
      id: row.id,
    };

    const dialogRef = this._dialog.open(AddAnimeComponent, {
      data: editRow,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.updatedAnime) {
        const updatedAnime: IAnime = this._getNewAnimeItem(res.updatedAnime);
        this._animeList.push(updatedAnime);
        this._modifyList();
      }
    });
  }

  public removeItem(anime: ITableData): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Are you sure want to delete ${anime.name}`,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this._animeService
          .deleteAnime(anime.id)
          .pipe(take(1))
          .subscribe((res) => {
            this._getAnimeList();
          });
      }
    });
  }

  public stopPropaganation(event: MouseEvent): void {
    event.stopPropagation();
  }

  private _mapAnimeListData(list: IServerAnime[]): IAnime[] {
    const modifiedList =
      list.map((a) => {
        return {
          id: a._id,
          name: a.name,
          nameUA: a.nameUA,
          stars: a.stars,
          time: a.time,
          genres: a.genres,
          status: a.status,
        };
      }) || [];

    return [...modifiedList];
  }

  private _getNewAnimeItem(elem: IServerAnime): IAnime {
    const modifiedEl = {
      id: elem._id,
      name: elem.name,
      nameUA: elem.nameUA,
      stars: elem.stars,
      time: elem.time,
      genres: elem.genres,
      status: elem.status,
    };

    return modifiedEl;
  }

  ngOnDestroy(): void {
    this._searchValueChangesSub?.unsubscribe();
  }
}
