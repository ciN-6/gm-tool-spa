import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-turn-order',
  standalone: true,
  templateUrl: './turn-order.component.html',
  styleUrl: './turn-order.component.scss',
  imports:[    
    AsyncPipe,
    CommonModule,
    FormsModule, 
    MatAutocompleteModule,
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule]
})
export class TurnOrderComponent {

  public playerName
}
