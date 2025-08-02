import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScreenService } from '../../services/screen.service';
import { HomeComponent } from './home.component';
import { MobileHomeComponent } from '../mobile/mobile-home.component';

@Component({
  selector: 'app-home-wrapper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (screenService.isMobile()) {
      <app-mobile-home />
    } @else {
      <app-home />
    }
  `,
  imports: [HomeComponent, MobileHomeComponent]
})
export class HomeWrapperComponent {
  protected screenService = inject(ScreenService);
}
