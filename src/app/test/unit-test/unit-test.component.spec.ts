import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UnitTestComponent } from './unit-test.component';
import { IGetAnimeListResponse } from 'src/app/components/anime/helpers/model';

describe('UnitTestComponent', () => {
  let component: UnitTestComponent;
  let fixture: ComponentFixture<UnitTestComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ UnitTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitTestComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an observable of IGetAnimeListResponse', () => {
    const mockResponse: IGetAnimeListResponse = {
      status: 'Success',
      data: [{
        _id: 'qwe23csdce',
        name: 'Promised Neverland',
        nameUA: 'Неверленд',
        stars: 7,
        time: 524,
        genres: '',
        status: 'watched'
      }]
    };

    component.getAnimeList().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/anime');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });
});
