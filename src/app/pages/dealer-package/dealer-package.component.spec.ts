import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerPackageComponent } from './dealer-package.component';

describe('DealerPackageComponent', () => {
  let component: DealerPackageComponent;
  let fixture: ComponentFixture<DealerPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
