import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Observable, map, startWith } from 'rxjs';
import { turnOrderStore } from '../../store/reducers';
import { selectTurnOrder } from '../../store/selectors/turn-order.selector';
import { reorder } from '../../store/actions/turn-order.actions';



;


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
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    ReactiveFormsModule]
})
export class TurnOrderComponent implements OnInit {

  public playerNameInputCtrl = new FormControl('');
  public filteredPlayerNames: string[] = ['Nic', 'Emma', 'Jose', 'Steph', 'Luc'];
  public players!: string[];
  public filteredOptions: Observable<string[]> = new Observable<string[]>();

  @Input()
  showManager: boolean = true;

  constructor(private store: Store<turnOrderStore>) { }

  ngOnInit(): void {
    this.filteredOptions = this.playerNameInputCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.store.select(selectTurnOrder).subscribe(
      (turnOrderStoreValue: turnOrderStore) => {
        if (turnOrderStoreValue)
          this.players = [...turnOrderStoreValue.turnOrder];
      }
    )
  }

  public ajouterPlayer() {
    if (!this.players) {
      this.players = []
    }
    let playerName = this.playerNameInputCtrl.value?.toString();
    if (playerName) {
      this.players = Object.assign([],this.players);
      this.players.push(playerName);
      if (!this.filteredPlayerNames?.includes(playerName)) {
        this.filteredPlayerNames.push(playerName);
        localStorage.setItem('players', JSON.stringify(this.filteredPlayerNames));
      }
    }
    this.playerNameInputCtrl.setValue("");
    this.store.dispatch(reorder({ turnOrder: this.players }))
  }

  public enleverPlayer(player: string) {
    const idx = this.players.indexOf(player);
    if (idx > -1) {
      this.players.splice(idx, 1);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.filteredPlayerNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
    this.store.dispatch(reorder({ turnOrder: this.players }))
  }

}

