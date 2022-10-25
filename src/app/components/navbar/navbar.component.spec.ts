import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarComponent } from './navbar.component';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpClientTestingModule,
      ],
      declarations: [NavbarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    component.darktheme=false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should test themeService', () => {
    component.toggled();
    expect(component.darktheme).toBe(true);
    component.toggled();
    expect(component.darktheme).toBe(false);
    component.toggled();
    expect(component.darktheme).toBe(true);

  });

});
