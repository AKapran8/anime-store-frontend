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

import { convertTimeToText, ratingDescriptionEnum } from './custom.pipes';

import {
  DeleteDialogComponent,
  IDeleteDialogData,
} from '../delete-dialog/delete-dialog.component';
import { AddAnimeComponent } from './add-edit-anime/add-edit-anime.component';

import {
  IAddEditAnime,
  IAnime,
  IExpansionPanelData,
} from 'src/app/components/anime/anime.model';

import { AnimeService } from './service/anime.service';
import { AuthService } from '../auth/service/auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent implements OnInit, OnDestroy {
  public totalAnimeCount: number | null = null;
  public searchControl: FormControl | null = null;
  public expansionPanelData: IExpansionPanelData[] = [];
  public isListFetching: boolean = false;
  public isListFetched: boolean = false;
  public isLoggedIn: boolean = false;
  public invalidUser: boolean = false;
  public userId: string = '';
  public pageSize: number = 0;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [];

  private _anime: IAnime[] = [];
  private _paginationConfig: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 0,
    previousPageIndex: 0,
  };

  private _searchValueChangesSub: Subscription | null = null;

  constructor(
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _animeService: AnimeService,
    private _authService: AuthService,
    private _snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this._getAuthData();
    this._initComponent();
    this._getAnime();
    this._initSearchControl();
  }

  private _getAuthData(): void {
    this.isLoggedIn = this._authService.getUserAuth().isAuth;
    this.userId = this._authService.getUserAuth().userId;
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
    this._anime = [];
    this.expansionPanelData = [];
    this.isListFetching = true;
    this.isListFetched = false;

    this._animeService
      .getAnimeList(
        this.pageSize,
        this.pageIndex,
        this.searchControl?.value.trim()
      )
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res) {
            this._anime = cloneDeep(res.data.animeList);
            this.isListFetching = false;
            this.isListFetched = true;
            this.totalAnimeCount = res.data.totalElements;
            this._getExpansionPanelData();
          }
        },
        error: (err) => {
          this.isListFetching = false;
          this.isListFetched = true;
          this.invalidUser = true;
          this._cdr.markForCheck();
        },
      });

    this._cdr.markForCheck();
  }

  private _getExpansionPanelData(): void {
    this.expansionPanelData = this._anime.map((a) => {
      const ratingDescr = ratingDescriptionEnum[a.stars - 1];
      const timeText = convertTimeToText(a.time);

      return {
        ...a,
        ratingDescr,
        timeText,
      };
    });

    this._cdr.markForCheck();
  }

  private _initSearchControl(): void {
    this.searchControl = new FormControl('');

    this._searchValueChangesSub = this.searchControl?.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this._resetPagination();
        this._getAnime();
      });
  }

  public addAnime(): void {
    const dialogRef = this._dialog.open(AddAnimeComponent, {
      data: { type: 'add' },
    });
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
      data: { anime: editRow, type: 'edit' },
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

  public copyAnime(id: string): void {
    this._animeService
      .copyAnime(id)
      .pipe(take(1))
      .subscribe((res) => {
        this._snackbarService.createSuccessSnackbar(res.message);
        this._getAnime();
      });
  }

  public stopPropaganation(event: MouseEvent): void {
    event.stopPropagation();
  }

  public onPageChange(event: PageEvent) {
    this._paginationConfig = event;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

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
  }
}
