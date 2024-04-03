import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { TurnOrderCharacter } from '../../models/TurnOrderCharacter';
import { CharacterStore } from '../../store/actions/turn-order.actions';
import * as storeReducer from '../../store/actions/turn-order.actions';
import { selectFilteredPlayerList, selectTurnOrder } from '../../store/selectors/turn-order.selector';
import { MonsterCardComponent } from '../monster-card/monster-card.component';

@Component({
  selector: 'app-turn-order',
  standalone: true,
  templateUrl: './turn-order.component.html',
  styleUrl: './turn-order.component.scss',
  imports: [
    AsyncPipe,
    CdkDropList, CdkDrag,
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    MonsterCardComponent,
    ReactiveFormsModule]
})
export class TurnOrderComponent implements OnInit, OnDestroy {

  @HostListener('window:beforeunload')
  public beforeunload(): void {
    const strCharacterList = JSON.stringify(this.filteredPlayerNames);
    if (strCharacterList)
      localStorage.setItem('playerName', strCharacterList);
    else {
      localStorage.removeItem('playerName');
    }
  }

  public filteredPlayerNames: TurnOrderCharacter[] = [];
  public characters!: TurnOrderCharacter[];
  public filteredOptionsObs: Observable<string[]> = new Observable<string[]>();

  public lastCharacterClicked: string = 'Adult Brass Dragon';



  private sub: Subscription = new Subscription();
  @Input() showManager: boolean = true;

  turnOrderForm = this.formBuilder.group({
    characterName: new FormControl(''),
    isAdversary: new FormControl(false)
  });

  constructor(
    private store: Store<CharacterStore>,
    private formBuilder: FormBuilder
  ) { }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {

    //dispatch
    this.loadFromLocalStore();

    // subscribers
    this.subscribeFilteredPlayerList();
    this.subscribeTurnOrder();
    this.filteredOptionsObs = this.turnOrderForm.controls['characterName']
      .valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
  }

  public calculateClass(character: TurnOrderCharacter) {
    if (character.isAdversary) {
      return 'nowrap-elipse-advesary';
    }
    return 'nowrap-elipse';
  }

  public ajouterPlayer() {
    if (!this.turnOrderForm.value.characterName) {
      return;
    }
    if (this.characters.map(item => item.charcterName)
      .includes(this.turnOrderForm.value.characterName)) {
      this.turnOrderForm.reset();
      return;
    }
    if (!this.characters) {
      this.characters = [];
    }
    let newOrder: TurnOrderCharacter[] = [];
    const character = {
      charcterName: this.turnOrderForm.value.characterName || '',
      isAdversary: this.turnOrderForm.value.isAdversary || false
    };

    newOrder = [...this.characters, character];

    if (this.turnOrderForm.value.characterName !== '' &&
      !this.filteredPlayerNames?.map(item => item.charcterName).includes(character.charcterName)) {
      this.store.dispatch(storeReducer.addFilteredCharacter(character));
    }
    this.store.dispatch(storeReducer.reorderCharacter({ characters: newOrder }));
    this.turnOrderForm.reset();
  }

  public enleverPlayer(player: TurnOrderCharacter) {
    const idx = this.characters.indexOf(player);
    if (idx > -1) {
      this.characters.splice(idx, 1);
    }
    this.store.dispatch(storeReducer.reorderCharacter({ characters: this.characters }));
  }

  public setLastClicked(charcterName: string) {
    this.lastCharacterClicked = charcterName;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.filteredPlayerNames) {
      return this.filteredPlayerNames
        .map(item => item.charcterName)
        .filter(option => option.toLowerCase().includes(filterValue));
    } else {
      return [];
    }

  }

  public drop(event: CdkDragDrop<TurnOrderCharacter[]>) {
    moveItemInArray(this.characters, event.previousIndex, event.currentIndex);
    this.store.dispatch(storeReducer.reorderCharacter({ characters: this.characters }));
  }

  private loadFromLocalStore() {
    const coldStorage = localStorage.getItem('playerName');
    if (coldStorage) {
      this.filteredPlayerNames = JSON.parse(coldStorage);
    } else {
      this.filteredPlayerNames = [
        { charcterName: 'narciN', isAdversary: false },
        { charcterName: 'Tolo', isAdversary: false },
        { charcterName: 'Esma', isAdversary: false },
        { charcterName: 'Marvarie', isAdversary: false },
        { charcterName: 'Garfred', isAdversary: false },
      ];
    }
    this.store.dispatch(storeReducer.setFliteredCharacterList({
      characters: this.filteredPlayerNames
    }));
  }

  private subscribeTurnOrder() {

    this.sub.add(this.store.select(selectTurnOrder).subscribe(
      (order) => {
        if (order)
          this.characters = [...order];
      }
    ));
  }

  private subscribeFilteredPlayerList() {
    this.sub.add(this.store.select(selectFilteredPlayerList).subscribe(
      (playerList) => {
        if (playerList) {
          this.filteredPlayerNames = playerList;
        }
      }
    ));
  }

}

