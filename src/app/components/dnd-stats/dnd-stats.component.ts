import { Component, Input } from '@angular/core';
import { Monster } from '../../services/srb-model/models/monster/types';

@Component({
  selector: 'app-dnd-stats',
  standalone: true,
  imports: [],
  templateUrl: './dnd-stats.component.html',
  styleUrl: './dnd-stats.component.scss'
})
export class DndStatsComponent {

  @Input() monster!: Monster;

  calculateModifier(stat: number) {
    return Math.floor((stat - 10) / 2)
  }

}
