import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellSearchComponent } from './spell-search.component';

describe('SpellSearchComponent', () => {
  let component: SpellSearchComponent;
  let fixture: ComponentFixture<SpellSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpellSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
