import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedItemsComponent } from './feed-items.component';

describe('FeedItemsComponent', () => {
  let component: FeedItemsComponent;
  let fixture: ComponentFixture<FeedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
