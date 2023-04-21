import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQuoteComponent } from './add-edit-quote.component';

describe('AddEditQuoteComponent', () => {
  let component: AddEditQuoteComponent;
  let fixture: ComponentFixture<AddEditQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditQuoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
