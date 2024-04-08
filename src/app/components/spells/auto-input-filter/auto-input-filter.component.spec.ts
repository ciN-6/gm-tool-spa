import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoInputFilterComponent } from './auto-input-filter.component';

describe('AutoInputFilterComponent', () => {
  let component: AutoInputFilterComponent;
  let fixture: ComponentFixture<AutoInputFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoInputFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoInputFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
