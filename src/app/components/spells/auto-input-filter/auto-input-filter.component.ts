import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

/**
 * auto-input-filter
 */
@Component({
  selector: 'app-auto-input-filter',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,

  ],
  templateUrl: './auto-input-filter.component.html',
  styleUrl: './auto-input-filter.component.scss'
})
export class AutoInputFilterComponent implements OnChanges {

  separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() label!: string;
  @Input() allOptions!: string[];

  @Output() newFilterEvent = new EventEmitter<string[]>();

  @ViewChild('inputElem') inputElem!: ElementRef<HTMLInputElement>;
  public inputCtrl = new FormControl<string>('');

  filteredOptions: Observable<string[]> = new Observable<string[]>();
  public curentFilters: string[] = [];

  public reminingOptions: string[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allOptions'].firstChange) { return; }
    this.reminingOptions = JSON.parse(JSON.stringify(changes['allOptions'].currentValue));
    this.reminingOptions.sort();
    this.filteredOptions = this.inputCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  public remove(selected: string): void {
    const index = this.curentFilters.findIndex(x => x === selected);

    if (index >= 0) {
      this.curentFilters.splice(index, 1);
      this.reminingOptions.push(selected);
      this.reminingOptions.sort();
      this.inputCtrl.setValue(''); // to force update the mat-autocomplete Options.
    }
    this.newFilterEvent.emit(this.curentFilters);
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    const index = this.curentFilters.findIndex(x => x === event.option.viewValue);
    if (index >= 0) {
      this.curentFilters.splice(index, 1);
    }
    this.adding(event.option.viewValue)
  }

  private adding(filter: string) {
    const index = this.reminingOptions.indexOf(filter);
    if (index >= 0) {
      this.reminingOptions.splice(index, 1);
    }
    this.curentFilters.push(filter);
    this.inputElem.nativeElement.value = '';
    this.inputCtrl.setValue('');
    this.newFilterEvent.emit(this.curentFilters);

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.reminingOptions.filter(option => option.toLowerCase().includes(filterValue));
  }


}
