import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPackageModalComponent } from './select-package-modal.component';

describe('SelectPackageModalComponent', () => {
  let component: SelectPackageModalComponent;
  let fixture: ComponentFixture<SelectPackageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPackageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPackageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
