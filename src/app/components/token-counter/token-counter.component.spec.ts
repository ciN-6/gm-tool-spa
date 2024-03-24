import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenCounterComponent } from './token-counter.component';

describe('TokenCounterComponent', () => {
  let component: TokenCounterComponent;
  let fixture: ComponentFixture<TokenCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokenCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TokenCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
