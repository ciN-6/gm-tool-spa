import { Component, Input } from '@angular/core';
import * as characterAction from '../../../services/srb-model/models/monster/types';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-character-action',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './character-action.component.html',
  styleUrl: './character-action.component.scss'
})
export class CharacterActionComponent {


  @Input() actions!: characterAction.Action[];


}
