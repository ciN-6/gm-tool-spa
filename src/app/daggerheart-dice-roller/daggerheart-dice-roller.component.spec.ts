import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaggerheartDiceRollerComponent } from './daggerheart-dice-roller.component';

describe('DaggerheartDiceRollerComponent', () => {
  let component: DaggerheartDiceRollerComponent;
  let fixture: ComponentFixture<DaggerheartDiceRollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaggerheartDiceRollerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaggerheartDiceRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
