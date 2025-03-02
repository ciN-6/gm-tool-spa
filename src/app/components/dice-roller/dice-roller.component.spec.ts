import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Die } from '../../models/die';
import { DiceRollerComponent } from './dice-roller.component';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DiceRoll } from '../../store';

describe('DiceRollerComponent', () => {
  let component: DiceRollerComponent;
  let fixture: ComponentFixture<DiceRollerComponent>;

  const initialState: DiceRoll[] = [
    {
      modifier: 0,
      roll: []
    }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceRollerComponent,
        StoreModule.forRoot({})
      ],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DiceRollerComponent);
    component = fixture.componentInstance;
    component.logs = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('d4 rolls fine'), () => {
    let d4: Die = { size: 4, src: "" };
    for (let i = 0; i < 100; i++) {
      component['chosenDice'] = [d4];
      component.roll();
    }
  }

});
