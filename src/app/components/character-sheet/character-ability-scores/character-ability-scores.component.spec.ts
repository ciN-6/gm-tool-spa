import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAbilityScore } from './character-ability-scores.component';

describe('DndStatsComponent', () => {
  let component: CharacterAbilityScore;
  let fixture: ComponentFixture<CharacterAbilityScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterAbilityScore]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CharacterAbilityScore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
