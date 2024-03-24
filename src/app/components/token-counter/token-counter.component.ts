import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { addToken, decrementToken, incrementToken, removeToken } from '../../store/counter.actions';
import { Counter, Counters } from '../../store/reducers';
import * as selectors from '../../store/selectors/counter.selector';

@Component({
  selector: 'app-token-counter',
  standalone: true,
  templateUrl: './token-counter.component.html',
  styleUrl: './token-counter.component.scss',
  imports: [MatIcon, MatButtonModule, CdkDrag, MatCardModule]
})
export class TokenCounterComponent implements OnDestroy, OnInit {

  // private count$: Observable<Counter[] | undefined>;

  subscription = new Subscription()
  @Input()
  counterName!: string;

  @Output()
  removeCounterParent = new EventEmitter<string>();


  public storedToken!:Counter;
  constructor(private counterStore: Store<Counters>) {
  }



  ngOnInit(): void {
    this.storedToken = { name: this.counterName, amount:0 };

    console.log("token-counter -> " , this.storedToken)
    this.counterStore.dispatch(
      addToken(this.storedToken));

    this.subscription.add(
      this.counterStore.select(selectors.selectTokenCounter(this.counterName))
        .subscribe((value:Counter)=>{
          this.storedToken = value
        })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  add() {
    this.counterStore.dispatch(incrementToken(this.storedToken));
  }
  substract() {
    this.counterStore.dispatch(decrementToken(this.storedToken));

  }
  removeCounter() {
    this.removeCounterParent.emit(this.counterName);
    this.counterStore.dispatch(removeToken(this.storedToken));

  }

}
