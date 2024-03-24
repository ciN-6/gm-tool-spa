import { Component } from '@angular/core';
import { Die } from '../models/die';
import { MatButtonModule } from '@angular/material/button';
import { dieType } from '../constantes/constantes';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

export interface HopeDie extends Die {
  type: string;
}


@Component({
  selector: 'app-daggerheart-dice-roller',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIcon],
  templateUrl: './daggerheart-dice-roller.component.html',
  styleUrl: './daggerheart-dice-roller.component.scss'
})
export class DaggerheartDiceRollerComponent {



  public isFear = false;
  public isCritical = false;
  public isHope = false;
  public totalRolled = 0;
  public fearValue = 0;
  public hopeValue = 0;
  private advDie: HopeDie = { size: 6, src: "assets/dice/d6-green.svg", type: dieType.d6Adv };
  private disDie: HopeDie = { size: 6, src: "assets/dice/d6-red.svg", type: dieType.d6Dis };
  public specialDice: HopeDie[] = [
    { size: 12, src: "assets/dice/d12-teal.svg", type: dieType.critical },
    this.advDie,
    this.disDie
  ]
  public dice: HopeDie[] = [
    { size: 12, src: "assets/dice/d12-fear.svg", type: dieType.fear },
    { size: 12, src: "assets/dice/d12-hope.svg", type: dieType.hope }
  ];
  public advDice: HopeDie[] = []
  public disDice: HopeDie[] = []
  public advValue: number = 0;
  public disValue: number = 0;

  get fearDie(): string | undefined {
    console.log("fear")
    let i = this.dice.findIndex(die => die.type === dieType.fear);
    return this.dice[i].src;
  }
  get hopeDie(): string | undefined {
    let die = this.dice.findIndex(die => die.type === dieType.hope);
    return this.dice[die].src;
  }
  get criticalDie(): string | undefined {
    let die = this.specialDice.findIndex(die => die.type === dieType.critical);
    return this.specialDice[die].src;
  }

  get advDieSrc(): string | undefined {
    let die = this.specialDice.findIndex(die => die.type === dieType.d6Adv);
    return this.specialDice[die].src;
  }
  get disDieSrc(): string | undefined {
    let die = this.specialDice.findIndex(die => die.type === dieType.d6Dis);
    return this.specialDice[die].src;
  }

  get advAmount() {
    return this.advDice.length;
  }
  get disAmount() {
    return this.disDice.length;
  }

  public addAdv() {
    this.advDice.push(Object.create(this.advDie));
  }
  public addDis() {
    this.disDice.push(Object.create(this.disDie));
  }
  public resetModifiers(alsoModifier: boolean) {
    if (alsoModifier) {
      this.disDice = [];
      this.advDice = [];
      this.advValue = 0;
      this.disValue = 0;
    }

    this.isFear = false;
    this.isCritical = false;
    this.isHope = false;
    this.fearValue = 0;
    this.hopeValue = 0;
    this.totalRolled = 0;

  }

  public dualRoll() {

    this.resetModifiers(false);
    let fearDie = this.dice.find(die => die.type === dieType.fear);
    let hopeDie = this.dice.find(die => die.type === dieType.hope);
    if (fearDie && hopeDie) {
      this.fearValue = this.rollOneDie(fearDie)
      this.hopeValue = this.rollOneDie(hopeDie)
    }
    if (this.fearValue > this.hopeValue) {
      this.isCritical = false;
      this.isFear = true;
      this.isHope = false;
    } else if (this.fearValue < this.hopeValue) {
      this.isCritical = false;
      this.isFear = false;
      this.isHope = true;
    } else {
      this.isCritical = true;
      this.isFear = false;
      this.isHope = false;
    }
    for (let x of this.advDice) {
      x.valueRolled = this.rollOneDie(x);
      this.totalRolled += x.valueRolled;
      this.advValue += x.valueRolled;
    }
    for (let x of this.disDice) {
      x.valueRolled = this.rollOneDie(x);
      this.totalRolled -= x.valueRolled;
      this.disValue -= x.valueRolled;
    }
    this.totalRolled += this.fearValue + this.hopeValue;
  }


  private rollOneDie(die: Die) {
    return Math.floor(Math.random() * die.size) + 1;
  }
}

