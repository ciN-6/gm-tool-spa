import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellCardComponent } from './spell-card.component';
import { Store, StoreModule } from '@ngrx/store';
import { markdownFormatter } from '../../../directives/markdown-formatter.pipe';
import { MarkdownModule } from 'ngx-markdown';
import { SpellStore } from '../../../store/actions/spells.actions';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { selectSpecificSpell } from '../../../store/selectors/spell.selector';
import { Spell } from '../../../services/srb-model/models/spell/types';

describe('SpellCardComponent', () => {
  let component: SpellCardComponent;
  let fixture: ComponentFixture<SpellCardComponent>;
  let store: Store<SpellStore>;
  let dispatchSpy: jasmine.Spy;


  const fireball: Spell = {
    index: '1',
    name: 'Fireball',
    level: 3,
    school: {
      index: 'evocation',
      name: 'Evocation',
      url: 'http://fakeapi.com'
    },
    desc: ['A bright streak flashes from your pointing finger...'],
    damage: { damage_at_slot_level: { 3: '8d6' } }
  };
  const iceball: Spell = {
    index: '2',
    name: 'iceball',
    level: 4,
    school: {
      index: 'evocation',
      name: 'Evocation',
      url: 'http://fakeapi.com'
    },
    desc: ['A bright streak flashes from your pointing finger...'],
    damage: { damage_at_slot_level: { 4: '9d6' } }
  };



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MarkdownModule.forRoot(),
        markdownFormatter,
        SpellCardComponent,
        StoreModule.forRoot({})
      ],
      providers: [provideMockStore({})]
    })
      .compileComponents();


    store = TestBed.inject(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    spyOn(store, 'select').and.callFake((selector: any) => {
      if (selector === selectSpecificSpell('1')) {
        return of(fireball);
      }
      if (selector === selectSpecificSpell('2')) {
        return of(iceball);
      }
      return of({});
    });

    fixture = TestBed.createComponent(SpellCardComponent);
    component = fixture.componentInstance;
    component.incomingSpell = {
      index: fireball.index,
      name: fireball.name,
      level: fireball.level,
      school: fireball.school,
      desc: fireball.desc,
    };;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
