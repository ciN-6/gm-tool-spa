import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map, startWith, take } from 'rxjs';
import { Spell } from '../../../services/srb-model/models/spell/types';
import { SpellStore, getAllSpells, getSpellDetail } from '../../../store/actions/spells.actions';
import { selectLevel, selectMagicSchool, selectspell } from '../../../store/selectors/spell.selector';
import { AutoInputFilterComponent } from '../auto-input-filter/auto-input-filter.component';
import { SpellCardComponent } from '../spell-card/spell-card.component';

export interface FilterOptions {
  levels: number[];
  school: string[];
  class: string[];
  spellName?: string;
}


@Component({
  selector: 'app-spell-search',
  standalone: true,
  imports: [
    AsyncPipe,
    AutoInputFilterComponent,
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    SpellCardComponent],
  templateUrl: './spell-search.component.html',
  styleUrl: './spell-search.component.scss'
})
export class SpellSearchComponent implements OnInit, OnDestroy {

  public allSpells: Spell[] = [];
  public currentSpellPage: Spell[] = [];
  public currentFilteredSpellPage: Spell[] = [];
  public curentFilters: FilterOptions = {
    levels: [], school: [], class: [], spellName: ''
  }

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  //page
  public pageEvent!: PageEvent;
  public length: number = 0;
  public pageSize: number = 5;
  public pageIndex: number = 0;
  public panelOpenState = false;
  //panel
  public isOpened = false;
  public openedPanelSpells: Spell[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  public schoolFilterOptions: string[] = [];
  public levelFilterOptions: number[] = [];
  public classFilterOptions: string[] = [];
  public spellNamesFilterOptions: string[] = [];

  public spellNamesFilteredOptions: Observable<string[]> = new Observable<string[]>();
  public spellNameInputCtrl = new FormControl<string>('');

  private subs = new Subscription()

  constructor(
    private store: Store<SpellStore>
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(getAllSpells());
    this.subscribePageStartup();
    this.subscribeFilters();
    this.subscribeFilterSelected();
  }

  public clearSpellName() {
    this.spellNameInputCtrl.setValue('')
  }

  public setSchoolFilterEvent(newFilter: string[]) {
    this.curentFilters.school = newFilter
    this.applyFilters();
  }
  public setLevelFilterEvent(newFilter: string[]) {
    this.curentFilters.levels = newFilter.map(x => +x)
    this.applyFilters();
  }
  public convertNumToStr(array: number[]) {
    return array.map(x => x.toString())
  }

  public handlePageEvent(e: PageEvent) {
    this.accordion.closeAll();
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.setCurrentSpellPage();
  }

  public opened(spell: Spell) {
    this.store.dispatch(getSpellDetail(spell))
    this.openedPanelSpells.push(spell);
  }

  public isThisOneOpened(spell: Spell) {
    return this.openedPanelSpells.findIndex(x => x.index === spell.index) >= 0

  }

  public closed(spell: Spell) {
    let idx = this.openedPanelSpells.findIndex(ds => ds.index === spell.index);
    if (idx >= 0) {
      this.openedPanelSpells.splice(idx, 1);
    }
  }

  private applyFilters() {
    if (!this.curentFilters) { return }
    let newFilter: Spell[] = JSON.parse(JSON.stringify(this.allSpells));
    if (this.curentFilters.spellName) {
      newFilter = newFilter.filter(spell => this.curentFilters.spellName === spell.name);
    }
    if (this.curentFilters.levels && this.curentFilters.levels?.length > 0) {
      newFilter = newFilter.filter(spell => {
        if (this.curentFilters.levels)
          return this.curentFilters.levels.includes(spell.level)
        return false;
      });
    }
    if (this.curentFilters.school && this.curentFilters.school?.length > 0) {
      newFilter = newFilter.filter(spell => {
        if (this.curentFilters.school)
          return this.curentFilters.school.includes(spell.school.name)
        return false;
      })
    }
    this.currentFilteredSpellPage = newFilter;
    this.setCurrentSpellPage();
  }

  private setCurrentSpellPage() {
    let start = (this.pageIndex * this.pageSize);
    let end = start + this.pageSize;
    this.currentSpellPage = this.currentFilteredSpellPage.slice(start, end);
  }

  private subscribeFilterSelected() {
    this.subs.add(
      this.spellNameInputCtrl.valueChanges.subscribe({
        next: (val) => {
          this.curentFilters = { ...this.curentFilters, spellName: val ? val : undefined };
          this.applyFilters();
        }
      }));
  }

  private subscribeFilters() {
    this.subs.add(
      this.store.select(selectMagicSchool).subscribe({
        next: (magicSchool: string[]) => {
          if (magicSchool.length > 0) {
            this.schoolFilterOptions = magicSchool;
          }
        }
      })
    );

    this.subs.add(
      this.store.select(selectLevel).subscribe({
        next: (levels: number[]) => {
          if (levels)
            this.levelFilterOptions = levels;
        }
      })
    );
  }

  private subscribePageStartup() {


    this.subs.add(
      this.store.select(selectspell).pipe(take(2)).subscribe({
        next: (allSpells) => {
          if (allSpells.length > 0) {
            this.allSpells = allSpells;
            this.currentFilteredSpellPage = allSpells;
            this.spellNamesFilterOptions = [...new Set(this.allSpells.map(spell => spell.name))]
            this.spellNamesFilteredOptions = this.spellNameInputCtrl.valueChanges.pipe(
              startWith(''),
              map(value => this._filter(value || '')),
            );
          }
          this.setCurrentSpellPage();
        }
      }));
  }

  /**
   * Filter the spell list based on user input.
   * @param value user input characters. 
   * @returns 
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.spellNamesFilterOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
