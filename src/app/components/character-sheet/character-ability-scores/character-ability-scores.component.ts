import { Component, Input } from '@angular/core';
import { Monster } from '../../../services/srb-model/models/monster/types';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-character-ability-scores',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './character-ability-scores.component.html',
  styleUrl: './character-ability-scores.component.scss'
})
export class CharacterAbilityScore {

  @Input() monster!: Monster;

  calculateModifier(stat: number) {
    return Math.floor((stat - 10) / 2)
  }

}
