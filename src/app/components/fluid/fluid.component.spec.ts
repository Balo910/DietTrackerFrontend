import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluidComponent } from './fluid.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FluidService } from '../../services/fluid.service';
import { of } from 'rxjs';

describe('FluidComponent', () => {
  let component: FluidComponent;
  let fixture: ComponentFixture<FluidComponent>;
  let fluidService: jasmine.SpyObj<FluidService>;

  beforeEach(async () => {
    const fluidServiceSpy = jasmine.createSpyObj('FluidService', ['getFluids']);

    await TestBed.configureTestingModule({
      declarations: [FluidComponent],
      imports: [HttpClientTestingModule, MatCardModule, MatButtonModule],
      providers: [{ provide: FluidService, useValue: fluidServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FluidComponent);
    component = fixture.componentInstance;
    fluidService = TestBed.inject(FluidService) as jasmine.SpyObj<FluidService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load fluid entries on init', () => {
    const mockFluids = [{ id: 1, name: 'Woda', amount: 500 }];
    fluidService.getFluids.and.returnValue(of(mockFluids));

    component.ngOnInit();

    expect(component.fluidEntries).toEqual(mockFluids);
  });
});
