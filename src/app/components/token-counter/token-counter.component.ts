import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-token-counter',
  standalone: true,
  templateUrl: './token-counter.component.html',
  styleUrl: './token-counter.component.scss',
  imports: [MatIcon, MatButtonModule, CdkDrag, MatCardModule]
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
