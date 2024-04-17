import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiCheckTableComponent } from './epi-check-table.component';

describe('EpiCheckTableComponent', () => {
  let component: EpiCheckTableComponent;
  let fixture: ComponentFixture<EpiCheckTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpiCheckTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpiCheckTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
