import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnOrderComponent } from './turn-order.component';
import { Store, StoreModule } from '@ngrx/store';
import { CharacterStore, reorderCharacter } from '../../store/actions/turn-order.actions';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TurnOrderCharacter } from '../../models/TurnOrderCharacter';

describe('TurnOrderComponent', () => {
  let component: TurnOrderComponent;
  let fixture: ComponentFixture<TurnOrderComponent>;
  let store: Store<CharacterStore>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        TurnOrderComponent],
      declarations: []
    })
      .compileComponents();

    fixture = TestBed.createComponent(TurnOrderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  describe('ajouterPlayer', () => {
    beforeEach(async () => {
      // initialisation des valeurs par défaut
      component.characters = [];
    });

    it('ajouter Player', () => {

      const expectedCharacter: TurnOrderCharacter = {
        charcterName: 'Mage',
        isMonster: false,
      };
      const expectedNewOrder: TurnOrderCharacter[] = [expectedCharacter];
      component.turnOrderForm.patchValue({
        isMonster: false,
        isDndBeyondCharacter: false,
        characterName: 'Mage',
      });
      component.turnOrderForm.value.characterName = 'Mage';
      dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

      component.ajouterPlayer();

      expect(dispatchSpy).toHaveBeenCalledWith(
        reorderCharacter({ characters: expectedNewOrder })
      );
    });

  });




  describe('null checks', () => {
    beforeEach(async () => {
      // initialisation des valeurs par défaut
      component.characters = [];
    });

    it('ajouter Player null ne fait rien', () => {
      component.turnOrderForm.value.characterName = null
      dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

      component.ajouterPlayer();
      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('ajouter Player dndBeyond ne fait rien', () => {
      component.turnOrderForm.value.characterName = null
      dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
      component.ajouterPlayer();
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });

});
