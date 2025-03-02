import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenManagerComponent } from './token-manager.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TokenManagerComponent', () => {
  let component: TokenManagerComponent;
  let fixture: ComponentFixture<TokenManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        TokenManagerComponent
      ]
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
