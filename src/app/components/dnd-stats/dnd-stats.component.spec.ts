import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DndStatsComponent } from './dnd-stats.component';

describe('DndStatsComponent', () => {
  let component: DndStatsComponent;
  let fixture: ComponentFixture<DndStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DndStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DndStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
