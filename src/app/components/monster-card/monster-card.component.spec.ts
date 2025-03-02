import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonsterCardComponent, SpellLevel } from './monster-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Store, StoreModule } from '@ngrx/store';
import { SrbApiService } from '../../services/srb-api.service';
import { of } from 'rxjs';
import { Monster, SpecialAbility } from '../../services/srb-model/models/monster/types';
import { MatButtonModule } from '@angular/material/button';
import { CharacterStore } from '../../store/actions/turn-order.actions';
import { Router } from '@angular/router';
import { CharacterActionComponent } from '../character-sheet/character-action/character-action.component';
import { CharacterCardSimpleListSectionComponent } from '../character-sheet/character-card-simple-list-section/character-card-simple-list-section.component';
import { CharacterAbilityScore } from '../character-sheet/character-ability-scores/character-ability-scores.component';
import { TurnOrderCharacter } from '../../models/TurnOrderCharacter';
import * as actions from '../../store/actions/turn-order.actions';
import { transformIntoKey } from '../../util/util';

describe('MonsterCardComponent', () => {
  let component: MonsterCardComponent;
  let fixture: ComponentFixture<MonsterCardComponent>;
  let store: Store<CharacterStore>;
  let srbApiServiceSpy: jasmine.SpyObj<SrbApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockMonster: Monster = {
    // ... your mock Monster data
    name: 'mockMonster',
    actions: [],
    index: "index1",
    size: "size",
    type: "type",
    subtype: "subtype",
    alignment: "alignment",
    hit_points: 1,
    hit_dice: "1d1",
    hit_points_roll: "1",
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
    proficiencies: [],
    damage_vulnerabilities: [],
    damage_resistances: [],
    damage_immunities: [],
    condition_immunities: [],
    languages: "",
    challenge_rating: 1,
    xp: 1,
    armor_class: [],
    special_abilities: [
      {
        name: 'Spellcasting',
        usage: { times: 1, type: 'day' },
        desc: '- 1st level (4 slots): bless, cure wounds, guiding bolt, sanctuary- 2nd level (3 slots): lesser restoration, magic weapon- 3rd level (3 slots): dispel magic, mass healing word'

      }
    ],
    senses: {
      _id: undefined,
      blindsight: undefined,
      darkvision: undefined,
      passive_perception: 0,
      tremorsense: undefined,
      truesight: undefined
    },
    speed: {
      _id: undefined,
      burrow: undefined,
      climb: undefined,
      fly: undefined,
      hover: undefined,
      swim: undefined,
      walk: undefined
    },
    url: ''
  };

  const mockTurnOrderCharacter: TurnOrderCharacter = {
    charcterName: 'mockMonster',
    monster: mockMonster,

  };

  beforeEach(async () => {
    srbApiServiceSpy = jasmine.createSpyObj('SrbApiService', ['']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        MatCardModule,
        MatCheckboxModule,
        MatButtonModule,
        CharacterActionComponent,
        CharacterCardSimpleListSectionComponent,
        CharacterAbilityScore
      ],
      providers: [
        { provide: SrbApiService, useValue: srbApiServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(MonsterCardComponent);
    component = fixture.componentInstance;
    component.monsterReceived = mockTurnOrderCharacter;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['subs'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subs'].unsubscribe).toHaveBeenCalled();
  });

  it('should parse ability and fill spellList', () => {
    const ability: SpecialAbility = {
      name: 'Spellcasting',
      usage: { times: 1, type: 'day' },
      desc: '- 1st level (4 slots): bless, cure wounds, guiding bolt, sanctuary- 2nd level (3 slots): lesser restoration, magic weapon- 3rd level (3 slots): dispel magic, mass healing word'
    };
    component.isSpellCastingThenExtractSpells(ability);
    expect(component.spellList.size).toBe(3);
  });

  it('should route to spell', () => {
    const spell = 'Cure Wounds';
    component.routeToSpell(spell);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/spells/${transformIntoKey(spell)}`);
  });

  it('should dispatch setCurrentCharacter action when substract is called', () => {

    component.isSpellCastingThenExtractSpells(
      {
        name: 'Spellcasting',
        usage: { times: 1, type: 'day' },
        desc: '- 1st level (4 slots): bless, cure wounds, guiding bolt, sanctuary- 2nd level (3 slots): lesser restoration, magic weapon- 3rd level (3 slots): dispel magic, mass healing word'
      }
    );
    component.substract('1st level');
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should call dispatch getMonster action', () => {
    component.ngOnChanges({
      monsterReceived: {
        currentValue: mockTurnOrderCharacter,
        previousValue: null,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    expect(store.dispatch).toHaveBeenCalledWith(actions.getMonster({ name: 'mockMonster' }));
  });

  it('should not do anything if no spell', () => {
    spyOn(component.spellList, 'get').and.returnValue(undefined);
    component.substract('1st level');
    expect(component.spellList.get).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalledWith(actions.setCurrentCharacter({ monster: mockMonster }));
  });
});

