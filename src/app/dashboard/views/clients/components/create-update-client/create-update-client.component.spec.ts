import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateClientComponent } from './create-update-client.component';

describe('CreateUpdateClientComponent', () => {
  let component: CreateUpdateClientComponent;
  let fixture: ComponentFixture<CreateUpdateClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
