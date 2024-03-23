import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceRollerComponent, Die } from './dice-roller.component';

describe('DiceRollerComponent', () => {
  let component: DiceRollerComponent;
  let fixture: ComponentFixture<DiceRollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceRollerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiceRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('d4 rolls fine'), () => {

    let d4:Die={type:4,src:""};
    for(let i=0;i<100;i++){
      component['chosenDice']=[d4];
      component.roll();
    }


  }


});
