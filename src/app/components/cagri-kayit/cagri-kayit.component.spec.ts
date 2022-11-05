import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CagriKayitComponent } from './cagri-kayit.component';

describe('CagriKayitComponent', () => {
  let component: CagriKayitComponent;
  let fixture: ComponentFixture<CagriKayitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CagriKayitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CagriKayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
