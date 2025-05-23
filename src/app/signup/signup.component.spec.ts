import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { Renderer2 } from '@angular/core';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [Renderer2]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create signup component', () => {
    expect(component).toBeTruthy();
  });

  it('should call register() on valid input', () => {
    spyOn(console, 'log');
    const username = fixture.nativeElement.querySelector('#username');
    const password = fixture.nativeElement.querySelector('#password');
    const confirmPassword = fixture.nativeElement.querySelector('#confirmPassword');

    username.value = 'user';
    password.value = 'pass123';
    confirmPassword.value = 'pass123';

    username.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    confirmPassword.dispatchEvent(new Event('input'));

    component.register();

    expect(console.log).toHaveBeenCalledWith('Rejestracja:', {
      username: 'user',
      password: '12345'
    });
  });
});
