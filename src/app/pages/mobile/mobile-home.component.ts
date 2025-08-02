import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mobile-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mobile-home">
      <h1>Mobile Home Page</h1>
      <p>This is a test mobile page content.</p>
    </div>
  `,
  styles: `
    .mobile-home {
      padding: 1rem;
      text-align: center;

      h1 {
        color: #333;
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }

      p {
        color: #666;
        font-size: 1rem;
      }
    }
  `
})
export class MobileHomeComponent {
}
