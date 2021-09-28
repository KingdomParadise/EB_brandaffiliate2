import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerForgetPasswordComponent } from './dealer-forget-password.component';

describe('DealerForgetPasswordComponent', () => {
  let component: DealerForgetPasswordComponent;
  let fixture: ComponentFixture<DealerForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerForgetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
