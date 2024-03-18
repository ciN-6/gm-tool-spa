import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-turn-order',
  standalone: true,
  templateUrl: './turn-order.component.html',
  styleUrl: './turn-order.component.scss',
  imports:[    
    AsyncPipe,
    CdkDropList, CdkDrag,
    CommonModule,
    FormsModule, 
    MatAutocompleteModule,
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule]
})
export class TurnOrderComponent implements OnInit {

  public playerNameInputCtrl= new FormControl('');
  public filteredPlayerNames: string[]=[];
  public players: string[]=["Nic","Tolo","Marvarie","Garfred","Dvorak","Esma"];
  public filteredOptions: Observable<string[]> = new Observable<string[]>();

  @Input()
  showManager:boolean=true;

  ngOnInit(): void {
    this.filteredOptions = this.playerNameInputCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    
  }
  

  public ajouterPlayer(){
    let playerName = this.playerNameInputCtrl.value?.toString();
    if (playerName) {
      this.players.push(playerName);
      if (!this.filteredPlayerNames?.includes(playerName)){
        this.filteredPlayerNames.push(playerName);
        localStorage.setItem('players',JSON.stringify(this.filteredPlayerNames));
      }
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.filteredPlayerNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  public drop (event : CdkDragDrop<string[]>){
    moveItemInArray(this.players, event.previousIndex,event.currentIndex);
  }
  
}

