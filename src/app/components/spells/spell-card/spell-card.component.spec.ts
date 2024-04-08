import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellCardComponent } from './spell-card.component';

describe('SpellCardComponent', () => {
  let component: SpellCardComponent;
  let fixture: ComponentFixture<SpellCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpellCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
