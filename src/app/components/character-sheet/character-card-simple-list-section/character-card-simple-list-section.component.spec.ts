import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCardSimpleListSectionComponent } from './character-card-simple-list-section.component';

describe('CharacterCardSectionComponent', () => {
  let component: CharacterCardSimpleListSectionComponent;
  let fixture: ComponentFixture<CharacterCardSimpleListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardSimpleListSectionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CharacterCardSimpleListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
