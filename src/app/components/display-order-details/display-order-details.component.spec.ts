import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOrderDetailsComponent } from './display-order-details.component';

describe('DisplayOrderDetailsComponent', () => {
  let component: DisplayOrderDetailsComponent;
  let fixture: ComponentFixture<DisplayOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpClientTestingModule, {provide: ActivatedRoute, useValue: {
          params: of({id: 1})
        }}
      ],
      declarations: [ DisplayOrderDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
