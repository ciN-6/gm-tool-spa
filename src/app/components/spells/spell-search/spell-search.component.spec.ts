import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellSearchComponent } from './spell-search.component';
import { StoreModule } from '@ngrx/store';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { SrbApiService } from '../../../services/srb-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SpellSearchComponent', () => {
  let component: SpellSearchComponent;
  let fixture: ComponentFixture<SpellSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SpellSearchComponent,
        StoreModule.forRoot({})
      ],
      providers: [
        provideMockStore({}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {

              paramMap: convertToParamMap({ level: '1', school: 'evocation' }), // Mock parameters
            },
            paramMap: of(convertToParamMap({ level: '1', school: 'evocation' })) // Mock parameters as observable
          },
        },
        { provide: SrbApiService, useValue: SrbApiService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SpellSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should applyfilter when onSubmit is called', () => {
    const applyFiltersSpy = spyOn(component, 'applyFilters' as any);
    component.onSubmit();
    expect(applyFiltersSpy).toHaveBeenCalled();
  });

});
