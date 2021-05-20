import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should select "all" radio', () => {
    fixture.detectChanges();
    const radioAll = fixture.debugElement.query(By.css('input[value=""]')).nativeElement;

    expect(radioAll.checked).toEqual(true);
  });

  it('should select 50 radio', () => {
    fixture.componentInstance.limit = 50;
    fixture.detectChanges();
    const radio50 = fixture.debugElement.query(By.css('input[value="50"]')).nativeElement;

    expect(radio50.checked).toEqual(true);
  });

  it('should emit limit on change', () => {
    const onLimitChange = jasmine.createSpy();
    fixture.componentInstance.limitChange.subscribe(onLimitChange);
    fixture.detectChanges();

    const radio10 = fixture.debugElement.query(By.css('input[value="10"]')).nativeElement;

    radio10.click();

    expect(onLimitChange).toHaveBeenCalledOnceWith(10);
  });
});
