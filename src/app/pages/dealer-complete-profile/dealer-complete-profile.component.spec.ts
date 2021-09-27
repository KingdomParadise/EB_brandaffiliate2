import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerCompleteProfileComponent } from './dealer-complete-profile.component';

describe('DealerCompleteProfileComponent', () => {
  let component: DealerCompleteProfileComponent;
  let fixture: ComponentFixture<DealerCompleteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerCompleteProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerCompleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
