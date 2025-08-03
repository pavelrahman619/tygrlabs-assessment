import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-time-display',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="time-display">
      <div class="time-display__info">
        <div class="time-display__start-time">{{ startTime() }}</div>
        <div class="time-display__game-info">
          <span class="time-display__game-label">Game starts at </span>
          <span class="time-display__game-time">{{ gameTime() }}</span>
        </div>
        <div class="time-display__end-time">{{ endTime() }}</div>
      </div>

      <!-- Timeline -->
      <div class="time-display__timeline">
        <div class="time-display__timeline-start">
          <div class="time-display__timeline-gradient"></div>
          <svg
            class="time-display__pickup-arrow"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <circle cx="16" cy="16" r="16" fill="#79E9AF" />
            <path d="M12 16L16 12L20 16" stroke="white" stroke-width="2" />
          </svg>
        </div>
        <div class="time-display__timeline-middle">
          <svg
            class="time-display__middle-arrow"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <circle cx="16" cy="16" r="16" fill="#ffffff" />
            <path
              d="M12 16L16 12L20 16"
              stroke="#2169DB"
              stroke-width="2"
            />
          </svg>
          <div class="time-display__middle-line"></div>
          <div class="time-display__stadium-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#D3E1F8" />
              <path d="M8 12H24V20H8V12Z" fill="#2169DB" />
              <path d="M10 14H22V18H10V14Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './time-display.component.scss'
})
export class TimeDisplayComponent {
  startTime = input.required<string>();
  gameTime = input.required<string>();
  endTime = input.required<string>();
}
