import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="home">
      <h1>Desktop Home Page</h1>
      <p>This is a test desktop page content.</p>
    </div>
  `,
  styles: `
    .home {
      padding: 2rem;
      text-align: center;

      h1 {
        color: #333;
        margin-bottom: 1rem;
      }

      p {
        color: #666;
        font-size: 1.1rem;
      }
    }
  `
})
export class HomeComponent {
}
