import { Component, Input, OnInit } from '@angular/core';
import { SrbApiService } from '../../../services/srb-api.service';
import { Store } from '@ngrx/store';
import { SpellStore } from '../../../store/actions/spells.actions';
import { Subscription } from 'rxjs';
import { selectSpecificSpell, selectspell } from '../../../store/selectors/spell.selector';
import { Damage, Spell } from '../../../services/srb-model/models/spell/types';
import { markdownFormatter } from '../../../directives/markdown-formatter.pipe';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-spell-card',
  standalone: true,
  imports: [MarkdownModule, markdownFormatter],
  templateUrl: './spell-card.component.html',
  styleUrl: './spell-card.component.scss'
})
export class SpellCardComponent implements OnInit {


  @Input() incomingSpell!: Spell;
  public spell!: Spell;


  constructor(
    private store: Store<SpellStore>,
    private markdownService: MarkdownService
  ) { }


  private subs = new Subscription();
  ngOnInit(): void {
    this.subs.add(
      this.store.select(selectSpecificSpell(this.incomingSpell.index)).subscribe({
        next: (spell) => {
          if (spell) {
            this.spell = spell;
          }
        }, error: (err) => {
          console.error(err)
        }
      })
    )
  }


  getDamage(spell: Spell) {
    let dmg = undefined;
    if (spell.damage && spell.damage.damage_at_slot_level) {
      dmg = spell.damage.damage_at_slot_level[spell.level === 0 ? 1 : spell.level]
    }
    if (spell.damage && spell.damage.damage_at_character_level) {
      dmg = spell.damage.damage_at_character_level[spell.level === 0 ? 1 : spell.level]
    }
    return dmg
  }



}
