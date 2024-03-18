import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TokenCounterComponent } from '../token-counter/token-counter.component';
import { Observable, map, startWith } from 'rxjs';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-token-manager',
  standalone: true,
  templateUrl: './token-manager.component.html',
  styleUrl: './token-manager.component.scss',
  imports: [
    AsyncPipe,
    CommonModule,
    CdkDropList, CdkDrag,
    FormsModule, 
    MatAutocompleteModule,
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TokenCounterComponent 
  ]
})
export class TokenManagerComponent implements OnInit, OnChanges {
  
  
  public tokenManagerClass:string = "token-manager";
  public tokenNameInputCtrl = new FormControl('');
  public tokenNameOptions: string[] = [];
  public counters: string[] = [];
  public tokenName: string = "";
  public filteredOptions: Observable<string[]> = new Observable<string[]>();
  @Input()
  public showManager:boolean=false;

  ngOnChanges(changes: SimpleChanges): void {
    let showManagerChanges = changes['showManager'];
    if (showManagerChanges.currentValue){
      this.tokenManagerClass = "token-manager";
    } else {
      this.tokenManagerClass = "token-manager reverse";
    }
  }


  ngOnInit(): void {
    this.counters.push("Fear");
    this.counters.push("Combat");

    let storage = localStorage.getItem('tokenCounterNames');
    if (storage) {
      this.tokenNameOptions = JSON.parse(storage);
    }
    this.filteredOptions = this.tokenNameInputCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
 
  public ajouterToken(){
    let counterName = this.tokenNameInputCtrl.value?.toString();
    if (counterName) {
      this.counters.push(counterName);
      if (!this.tokenNameOptions?.includes(counterName)){
        this.tokenNameOptions.push(counterName);
        localStorage.setItem('tokenCounterNames',JSON.stringify(this.tokenNameOptions));
      }
    }
  }

  getValue(event:Event):string {
    return (event.target as HTMLInputElement).value;
  }

  removeCounter(event:string){
    console.log(event);
    const index = this.counters.indexOf(event.toString());
    if (index > -1) { // only splice array when item is found
      this.counters.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  public drop (event : any){
    moveItemInArray(this.counters, event.previousIndex,event.currentIndex);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tokenNameOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
