import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-token-counter',
  standalone: true,
  templateUrl: './token-counter.component.html',
  styleUrl: './token-counter.component.scss',
  imports: [MatIcon, MatButtonModule]
})
export class TokenCounterComponent {

  @Input()
  counterName!: string;

  @Output()
  removeCounterParent = new EventEmitter<string>();
  
  count:number = 0;
  
  add(){
    this.count++;
  }
  substract(){
    this.count--;
  }
  removeCounter(){
    this.removeCounterParent.emit(this.counterName);
  }

}
