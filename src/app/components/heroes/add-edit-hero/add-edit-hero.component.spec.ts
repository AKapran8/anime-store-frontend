import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHeroComponent } from './add-edit-hero.component';

describe('AddEditHeroComponent', () => {
  let component: AddEditHeroComponent;
  let fixture: ComponentFixture<AddEditHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditHeroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
