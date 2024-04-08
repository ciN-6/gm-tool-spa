import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterActionComponent } from './character-action.component';

describe('CharacterActionComponent', () => {
  let component: CharacterActionComponent;
  let fixture: ComponentFixture<CharacterActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
