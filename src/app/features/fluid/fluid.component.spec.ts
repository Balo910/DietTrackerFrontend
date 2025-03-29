import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FluidComponent } from './fluid.component';

describe('FluidComponent', () => {
  let component: FluidComponent;
  let fixture: ComponentFixture<FluidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FluidComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FluidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});