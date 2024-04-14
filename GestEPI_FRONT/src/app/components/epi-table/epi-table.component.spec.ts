import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiTableComponent } from './epi-table.component';

describe('EpiTableComponent', () => {
  let component: EpiTableComponent;
  let fixture: ComponentFixture<EpiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpiTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
