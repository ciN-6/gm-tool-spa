import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ChartsComponent } from '../charts/charts.component';
import { Subscription, of } from 'rxjs';
import { Die } from '../../models/die';
import { MatCardModule } from '@angular/material/card';
import { DiceRoll, DiceRollerStore } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { logDiceRoll } from '../../store/actions/dice-roller.actions';
import { selectDiceRoll } from '../../store/selectors/dice-roller.selector';

@Component({
  selector: 'app-dice-roller',
  standalone: true,
  imports: [MatButtonModule, ChartsComponent, MatCardModule],
  templateUrl: './dice-roller.component.html',
  styleUrl: './dice-roller.component.scss'
})
export class DiceRollerComponent implements OnInit {
  public dice: Die[] = [
    { size: 4, src: "assets/dice/d4-teal.svg" },
    { size: 6, src: "assets/dice/d6-teal.svg" },
    { size: 8, src: "assets/dice/d8-teal.svg" },
    { size: 12, src: "assets/dice/d12-teal.svg" },
    { size: 20, src: "assets/dice/d20-teal.svg" }
  ]

  public chosenDice: Die[] = [];
  public rolledDice: Die[] = [];
  public total: number = 0;
  public chartData: any = of([]);
  public modifier: number = 0;

  public logs!: DiceRoll[];
  public subs = new Subscription();

  /**
   * Contructeur
   * @param store Dice Roller Store
   */
  constructor(private store: Store<DiceRollerStore>) { }

  ngOnInit() {
    this.subs.add(
      this.store.select(selectDiceRoll).subscribe(
        (value: DiceRoll[]) => {
          this.logs = value;
        }
      )
    )
  }

  /**
   * Public Stuff
   */

  public addDice(dieToAdd: Die) {
    this.chosenDice.push(dieToAdd);
  }
  public clear() {
    this.chosenDice = [];
    this.total = 0;
    this.rolledDice = [];
  }

  public removeDice(dieToRemove: Die) {
    const index = this.chosenDice.indexOf(dieToRemove);
    if (index > -1) { // only splice array when item is found
      this.chosenDice.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  public roll() {

    this.rolledDice = [];
    let totalRolled = 0;

    for (let die of this.chosenDice) {
      let rolledValue = this.rollOneDie(die);
      this.rolledDice.push({ ...die, valueRolled: rolledValue });
      totalRolled += rolledValue;
    }
    this.total = totalRolled + this.modifier;

    this.store.dispatch(logDiceRoll({
      diceRoll: {
        modifier: this.modifier,
        roll: this.rolledDice,
      }
    }));
  }


  public calculateRoll(die: DiceRoll) {
    return die.modifier + die.roll.reduce((accumulator, currentValue) => {
      let currentRolledValue = currentValue.valueRolled ? currentValue.valueRolled : 0;
      return accumulator + currentRolledValue
    },0);
  }


  public plusOne() {
    this.modifier++;
    this.total++;
  }
  public minusOne() {
    this.modifier--;
    this.total--;
  }

  public diceTester(die: Die) {
    // let die:Die = {src:"",type:20}

    let data = [];
    for (let i = 1; i <= die.size; i++) {
      data.push({ value: i, timeRolled: 0 })
    }

    for (let i = 1; i <= 10000; i++) {
      let valueRolled = this.rollOneDie(die);
      let idx = data.findIndex(x => x.value === valueRolled);
      data[idx].timeRolled = data[idx].timeRolled + 1;
      this.chartData = of(data);
    }
  }

  /**
   * Private stuff
   */
  private rollOneDie(die: Die) {
    return Math.floor(Math.random() * die.size) + 1;
  }

}



