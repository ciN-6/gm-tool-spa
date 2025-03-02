import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatAccordion, MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
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
import { ActivatedRoute } from '@angular/router';
import * as util from '../../../util/util';
import spell from '../../../services/srb-model/models/spell';

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
  styleUrl: './spell-search.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpellSearchComponent implements OnInit, OnDestroy {

  public allSpells: Spell[] = [];
  public currentSpellPage: Spell[] = [];
  public currentFilteredSpellPage: Spell[] = [];
  public curentFiltersOptions: FilterOptions = {
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
  @ViewChildren(MatExpansionPanel)
  expansionPanels!: QueryList<MatExpansionPanel>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  public schoolFilterOptions: string[] = [];
  public levelFilterOptions: number[] = [];
  public classFilterOptions: string[] = [];
  public spellNamesFilterOptions: string[] = [];

  public spellNamesFilteredOptions: Observable<string[]> = new Observable<string[]>();
  public spellNameInputCtrl = new FormControl<string>('');

  public spellIndexFromRoute: string | null = null;

  private subs = new Subscription()

  constructor(
    private store: Store<SpellStore>,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    // this.subscribeRouteSpellIndex();
    this.store.dispatch(getAllSpells());
    this.subscribePageStartup();
    this.subscribeFilters();
    this.subscribeFilterNameInputSelected();

  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default "Enter" behavior (form submission)
    }
  }

  public onSubmit() {
    this.applyFilters();
  }

  public clearSpellName() {
    this.spellNameInputCtrl.setValue('');
  }

  public setSchoolFilterEvent(newFilter: string[]) {
    this.curentFiltersOptions.school = newFilter
    this.applyFilters();
  }

  public setLevelFilterEvent(newFilter: string[]) {
    this.curentFiltersOptions.levels = newFilter.map(x => +x)
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
    this.store.dispatch(getSpellDetail(spell));
    this.openedPanelSpells.push(spell);
  }

  public isThisSpellOpened(spell: Spell) {
    return this.openedPanelSpells.findIndex(x => x.index === spell.index) >= 0

  }

  public closed(spell: Spell) {
    let idx = this.openedPanelSpells.findIndex(ds => ds.index === spell.index);
    if (idx >= 0) {
      this.openedPanelSpells.splice(idx, 1);
    }
  }

  private applyFilters() {
    if (!this.curentFiltersOptions) { return }

    let newFilteredPage: Spell[] = JSON.parse(JSON.stringify(this.allSpells));

    if (this.curentFiltersOptions.spellName) {

      newFilteredPage = newFilteredPage.filter(spell =>
        util.transformIntoKey(spell.name).includes(
          util.transformIntoKey(this.curentFiltersOptions.spellName)));
    }

    if (this.curentFiltersOptions.levels && this.curentFiltersOptions.levels?.length > 0) {
      newFilteredPage = newFilteredPage.filter(spell => {
        if (this.curentFiltersOptions.levels)
          return this.curentFiltersOptions.levels.includes(spell.level);
        return false;
      });
    }


    if (this.curentFiltersOptions.school && this.curentFiltersOptions.school?.length > 0) {
      newFilteredPage = newFilteredPage.filter(spell => {
        if (this.curentFiltersOptions.school)
          return this.curentFiltersOptions.school.includes(spell.school.name);
        return false;
      })
    }

    this.currentFilteredSpellPage = newFilteredPage;
    this.setCurrentSpellPage();
  }

  private setCurrentSpellPage() {
    let start = (this.pageIndex * this.pageSize);
    let end = start + this.pageSize;
    this.currentSpellPage = this.currentFilteredSpellPage.slice(start, end);
  }

  private openSpellPanel(spellToOpen: Spell) {
    // Use a timeout to ensure panels are rendered
    setTimeout(() => {
      const panelToOpen = this.expansionPanels.find(
        panel => panel._body.nativeElement.parentElement?.getAttribute('spell-index') === spellToOpen.index);
      if (panelToOpen) {
        panelToOpen.open();
      }
      console.groupEnd();
    });
  }

  private subscribeFilterNameInputSelected() {
    this.subs.add(
      this.spellNameInputCtrl.valueChanges.subscribe({
        next: (val) => {
          let spellValue = val ? val : '';
          this.curentFiltersOptions = { ...this.curentFiltersOptions, spellName: spellValue };

          console.log("spellValue", spellValue);
          if (!this.openedPanelSpells.find(x => x.name.includes(spellValue))) {

            let spellToOpen = this.allSpells.find(x =>
              util.transformIntoKey(x.name) === spellValue);

            if (spellToOpen) {
              console.log("Spell to open", spellToOpen);
              this.openSpellPanel(spellToOpen);
            }
          }

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
        },
        complete: () => {
          this.subscribeRouteSpellIndex();
        }
      }));

  }


  private subscribeRouteSpellIndex() {
    this.subs.add(
      this.route.params.subscribe(params => {
        console.log("subscribeRouteSpellIndex - params", params);
        this.spellIndexFromRoute = params['route-spell-index'];
        if (this.spellIndexFromRoute) {
          console.log("subscribeRouteSpellIndex - spellIndexFromRoute", this.spellIndexFromRoute);
          this.curentFiltersOptions = { ...this.curentFiltersOptions, spellName: this.spellIndexFromRoute };
          this.spellNameInputCtrl.setValue(this.spellIndexFromRoute)
          this.applyFilters();
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
