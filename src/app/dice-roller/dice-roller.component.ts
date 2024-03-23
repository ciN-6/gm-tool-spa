import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ChartsComponent } from '../charts/charts.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-dice-roller',
  standalone: true,
  imports: [MatButtonModule, ChartsComponent],
  templateUrl: './dice-roller.component.html',
  styleUrl: './dice-roller.component.scss'
})
export class DiceRollerComponent {
  public dice: Die[] = [
    { type: 4, src: "assets/dice/d4.svg" },
    { type: 6, src: "assets/dice/d6.svg" },
    { type: 8, src: "assets/dice/d8.svg" },
    { type: 12, src: "assets/dice/d12.svg" },
    { type: 20, src: "assets/dice/d20.svg" }
  ]

  public chosenDice: Die[] = [];
  public rolledDice: Die[] = [];
  public total: number = 0;
  public chartData:any=of([]);
  public modifier:number=0;

  public addDice(dieToAdd: Die) {
    this.chosenDice.push(dieToAdd);
  }
  public clear(){
    this.chosenDice=[];
    this.total=0;
    this.rolledDice=[];
  }

  public removeDice(dieToRemove: Die) {
    const index = this.chosenDice.indexOf(dieToRemove);
    if (index > -1) { // only splice array when item is found
      this.chosenDice.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  public roll() {

    this.rolledDice=[];
    let totalRolled = 0;

    for (let die of this.chosenDice) {
      let rolledValue = this.rollOneDie(die) ;
      this.rolledDice.push({ ...die, valueRolled: rolledValue });
      totalRolled += rolledValue;
    }
    this.total = totalRolled + this.modifier;

  }

  private rollOneDie(die: Die) {
    return Math.floor(Math.random() * die.type)+ 1;
  }

  public plusOne(){
    this.modifier++;
  }
  public minusOne(){
    this.modifier--;
  }

public diceTester(die:Die) {
  // let die:Die = {src:"",type:20}

  let data = [];
  for (let i = 1; i<=die.type; i++){
    data.push({value:i,timeRolled:0})
  }
  
  for (let i=1;i<=10000;i++){
    let valueRolled = this.rollOneDie(die);
    let idx = data.findIndex(x=>x.value===valueRolled);
    data[idx].timeRolled = data[idx].timeRolled + 1;
    this.chartData = of(data);
  }
}

}



export class Die {
  type: number = 0;
  src: string = "";
  valueRolled?: number = 0;
}
