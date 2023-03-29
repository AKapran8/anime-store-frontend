import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeTableDataComponent } from './anime-table-data.component';

describe('AnimeTableDataComponent', () => {
  let component: AnimeTableDataComponent;
  let fixture: ComponentFixture<AnimeTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeTableDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
