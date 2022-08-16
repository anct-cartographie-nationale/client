import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FEATURES_TOKEN } from '../../../../root';
import { LieuxMediationNumeriqueRepository } from '../../../core';
import { OrientationLayout } from './orientation.layout';

describe('OrientationLayout', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [OrientationLayout],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: LieuxMediationNumeriqueRepository,
          useValue: {
            getAll$: () => of([])
          }
        },
        {
          provide: FEATURES_TOKEN,
          useValue: new Map()
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('OrientationLayout');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<OrientationLayout> = TestBed.createComponent(OrientationLayout);
    const orientationLayout: OrientationLayout = fixture.componentInstance;
    expect(orientationLayout).toBeTruthy();
  });
});
