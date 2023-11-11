import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';

@Component({
  template: `
    <div appDropdown></div>`
})
class TestDropdownComponent {
}

describe('DropdownDirective', () => {
  let component: TestDropdownComponent;
  let fixture: ComponentFixture<TestDropdownComponent>;
  let element: HTMLElement;
  let divEl: any

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownDirective, TestDropdownComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('div');
  });

  it('should create an instance', () => {
    const directive = new DropdownDirective(divEl);
    expect(directive).toBeTruthy();
  });

  it('checks if [appDropdown] host is created', () => {
    expect(element).not.toBeNull();
  });

  it('should toggle dropdown', () => {
    element.click();
    fixture.detectChanges();
    expect(element.classList.contains('open')).toBe(true, 'opens after one click');

    element.click();
    fixture.detectChanges();
    expect(element.classList.contains('open')).toBe(false, 'closes after two clicks');
  });

  it('should close dropdown if clicked outside', () => {
    element.click(); //open dropdown
    fixture.detectChanges();
    expect(element.classList.contains('open')).toBe(true, 'opens after click');

    // Simulate a click that bubbles up to the document
    document.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(element.classList.contains('open')).toBe(false, 'closes after click outside');
  });
});
