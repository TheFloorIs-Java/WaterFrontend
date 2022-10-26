import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarComponent } from './navbar.component';
import { ThemeServiceService } from 'src/app/services/theme-service.service';


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
    let service = TestBed.inject(ThemeServiceService);
    component.toggled();
    expect(service.getTheme()).toBe(component.darktheme);


  });

});
