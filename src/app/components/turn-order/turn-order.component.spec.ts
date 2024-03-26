import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnOrderComponent } from './turn-order.component';

describe('TurnOrderComponent', () => {
  let component: TurnOrderComponent;
  let fixture: ComponentFixture<TurnOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurnOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
