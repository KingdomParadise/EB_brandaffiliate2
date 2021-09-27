import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDealerComponent } from './review-dealer.component';

describe('ReviewDealerComponent', () => {
  let component: ReviewDealerComponent;
  let fixture: ComponentFixture<ReviewDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewDealerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
