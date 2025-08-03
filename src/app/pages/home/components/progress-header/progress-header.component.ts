import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-progress-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="progress-header">
      <div class="progress-header__step-slider">
        <div class="progress-header__progress-track"></div>
        <div
          class="progress-header__progress-bar"
          [style.width]="progressWidth()"
        ></div>
        <div class="progress-header__progress-dots">
          <div class="progress-header__dot" [class.active]="true"></div>
          <div class="progress-header__dot"></div>
          <div class="progress-header__dot"></div>
        </div>
        <div class="progress-header__step-counter">{{ currentStep() }}</div>
      </div>
      <div class="progress-header__content">
        <svg
          class="progress-header__chevron"
          width="26"
          height="25"
          viewBox="0 0 26 25"
          fill="none"
        >
          <path
            d="M15 8L11 12L15 16"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h1 class="progress-header__title">{{ title() }}</h1>
      </div>
    </div>
  `,
  styleUrl: './progress-header.component.scss',
  host: {
    'style': 'display: block; width: 100%;'
  }
})
export class ProgressHeaderComponent {
  progressWidth = input<string>('20%');
  currentStep = input<number>(1);
  title = input<string>('Select Your Game');
}
