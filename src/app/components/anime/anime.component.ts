import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take, debounceTime } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { cloneDeep } from 'lodash';

import { convertTimeToText, getStarsDescription } from './custom.pipes';

import {
  DeleteDialogComponent,
  IDeleteDialogData,
} from '../delete-dialog/delete-dialog.component';
import { AddAnimeComponent } from './add-anime/add-anime.component';

import {
  IAddEditAnime,
  IAnime,
  IExpansionPanelData,
} from 'src/app/components/anime/anime.mode';

import { AnimeService } from './service/anime.service';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent implements OnInit, OnDestroy {
  public totalAnimeCount: number | null = null;
  public pageSizeOptions: number[] = [];
  public pageSize: number | null = null;
  public searchControl: FormControl | null = null;
  public expansionPanelData: IExpansionPanelData[] = [];
  public isListFetching: boolean = false;
  public isListFetched: boolean = false;
  public isLoggedIn: boolean = false;

  private _anime: IAnime[] = [];
  private _paginationConfig: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 0,
    previousPageIndex: 0,
  };

  private _searchValueChangesSub: Subscription | null = null;
  private _authStatusSub: Subscription | null = null;

  constructor(
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    private _animeService: AnimeService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._getAuthStatus();
    this._initComponent();
    this._getAnime();
    this._initSearchControl();
  }

  private _getAuthStatus(): void {
    this.isLoggedIn = this._authService.getIsAuth().isAuth;
    this._authStatusSub = this._authService
      .authStatusStream()
      .subscribe((authStreamData: { isAuth: boolean; userName: string }) => {
        this.isLoggedIn = authStreamData.isAuth;
        this._cdr.markForCheck();
      });
    this._cdr.markForCheck();
  }

  private _initComponent(): void {
    this.pageSizeOptions = [5, 10, 20];
    this.pageSize = this.pageSizeOptions[0];
    this._paginationConfig = {
      ...this._paginationConfig,
      pageSize: this.pageSize,
    };

    this._cdr.markForCheck();
  }

  private _getAnime(): void {
    this.isListFetching = true;
    this.isListFetched = false;

    this._animeService
      .getAnimeList(
        this._paginationConfig.pageSize,
        this._paginationConfig.pageIndex,
        this.searchControl?.value.trim()
      )
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this._anime = cloneDeep(res.data.animeList);
          this.isListFetching = false;
          this.isListFetched = true;
          this.totalAnimeCount = res.data.totalElements;
          this._getExpansionPanelData();
        }
      });

    this._cdr.markForCheck();
  }

  private _getExpansionPanelData(): void {
    this.expansionPanelData = this._anime.map((a) => {
      const starsDescr = getStarsDescription(a.stars - 1);
      const timeText = convertTimeToText(a.time);

      return {
        ...a,
        starsDescr,
        timeText,
      };
    });

    this._cdr.markForCheck();
  }

  private _initSearchControl(): void {
    this.searchControl = new FormControl('');

    this._searchValueChangesSub = this.searchControl?.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((inputValue: string) => {
        if (inputValue) {
          this._resetPagination();
          this._getAnime();
        }
      });
  }

  public addAnime(): void {
    const dialogRef = this._dialog.open(AddAnimeComponent);
    dialogRef.afterClosed().subscribe((isAdded: boolean) => {
      if (isAdded) this._getAnime();
    });
  }

  public editAnime(row: IExpansionPanelData): void {
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

    dialogRef.afterClosed().subscribe((isEdited: boolean) => {
      if (isEdited) this._getAnime();
    });
  }

  public removeItem(anime: IExpansionPanelData): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        message: `Are you sure want to delete ${anime.name}?`,
        type: 'ANIME',
        id: anime.id,
      } as IDeleteDialogData,
    });

    dialogRef.afterClosed().subscribe((isDeleted: boolean) => {
      if (isDeleted) this._getAnime();
    });
  }

  public getAnimeById(id: string): void {
    this._router.navigate(['anime', id]);
  }

  public stopPropaganation(event: MouseEvent): void {
    event.stopPropagation();
  }

  public onPageChange(event: PageEvent) {
    this._paginationConfig = cloneDeep(event);
    this._getAnime();
  }

  private _resetPagination(): void {
    if (this._paginationConfig) {
      this._paginationConfig = { ...this._paginationConfig, pageIndex: 0 };
    }
  }

  ngOnDestroy(): void {
    this._searchValueChangesSub?.unsubscribe();
    this._authStatusSub?.unsubscribe();
  }
}
