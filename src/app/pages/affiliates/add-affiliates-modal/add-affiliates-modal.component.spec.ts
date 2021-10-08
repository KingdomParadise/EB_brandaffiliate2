import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAffiliatesModalComponent } from './add-affiliates-modal.component';

describe('AddAffiliatesModalComponent', () => {
  let component: AddAffiliatesModalComponent;
  let fixture: ComponentFixture<AddAffiliatesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAffiliatesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAffiliatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
