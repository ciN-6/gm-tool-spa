import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterAbilityScore } from './character-ability-scores.component';
import { Component } from '@angular/core';
import { Monster } from '../../../services/srb-model/models/monster/types';
import { By } from '@angular/platform-browser';


const injectMonster = {
  index: "mage",
  name: "Mage",
  size: "Medium",
  type: "humanoid",
  subtype: "any race",
  alignment: "any alignment",
  armor_class: [
    {
      value: 12,
      type: "armor"
    }
  ],
  hit_points: 40,
  hit_dice: "9d8",
  hit_points_roll: "9d8",
  speed: {
    walk: "30 ft."
  },
  strength: 9,
  dexterity: 14,
  constitution: 11,
  intelligence: 17,
  wisdom: 12,
  charisma: 11,
  challenge_rating: 6,
  xp: 2300
} as Monster;


@Component({
  selector: 'app-test-wrapper',
  template: '<app-character-ability-scores [monster]="testMonster"></app-character-ability-scores>',
  standalone: true,
  imports: [CharacterAbilityScore],
  styleUrls: ['./character-ability-scores.component.scss'], // Import the stylesheet here
})
class TestWrapperComponent {
  testMonster = injectMonster;
}

describe('DndStatsComponent', () => {
  let component: CharacterAbilityScore;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterAbilityScore, TestWrapperComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.query(By.directive(CharacterAbilityScore)).componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.monster).toEqual(injectMonster);
  });

  it('calcule le modifier correctement', () => {
    expect(component.calculateModifier(19)).toEqual(4)
  });

});
