import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Counter,  TokenCount } from '../../store/reducers';
import * as tokenSelector from '../../store/selectors/token-count.selector';
import * as tokenAction from '../../store/actions/token-count.actions';

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


  public storedToken!: Counter;
  constructor(
    private tokenCountStore: Store<TokenCount>
  ) { }



  ngOnInit(): void {
    this.storedToken = { name: this.counterName, amount: 0 };

    this.tokenCountStore.dispatch(
      tokenAction.addToken(this.storedToken));

    this.subscription.add(
      this.tokenCountStore.select(tokenSelector.newSelectTokenCounter(this.counterName))
        .subscribe((value: any) => {
          this.storedToken.amount = value
        })
    )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  add() {
    this.tokenCountStore.dispatch(tokenAction.incrementToken(this.storedToken));
  }
  substract() {
    this.tokenCountStore.dispatch(tokenAction.decrementToken(this.storedToken));

  }
  removeCounter() {
    this.removeCounterParent.emit(this.counterName);
    this.tokenCountStore.dispatch(tokenAction.removeToken(this.storedToken));

  }

}
