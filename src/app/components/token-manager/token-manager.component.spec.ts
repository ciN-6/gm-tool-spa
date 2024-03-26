import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenManagerComponent } from './token-manager.component';

describe('TokenManagerComponent', () => {
  let component: TokenManagerComponent;
  let fixture: ComponentFixture<TokenManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokenManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TokenManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
