import {
  Component,
  ChangeDetectionStrategy,
  signal,
  input,
  output,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-hour-slider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hour-slider__display">
      <span class="hour-slider__number">{{ selectedHours() }}</span>
      <span class="hour-slider__label"
        >hour{{ selectedHours() === 1 ? '' : 's' }}</span
      >
    </div>

    <!-- Slider Section -->
    <div class="hour-slider__section">
      <p class="hour-slider__text">Slide to set total ride duration</p>
      <div class="hour-slider__container">
        <div
          class="hour-slider__track"
          (click)="onSliderClick($event)"
          #sliderTrack
        >
          <div
            class="hour-slider__progress"
            [style.width]="getSliderProgress()"
          ></div>
          <div
            class="hour-slider__handle"
            [style.left]="getSliderPosition()"
            (mousedown)="onSliderMouseDown($event)"
          ></div>
        </div>
        <div class="hour-slider__dots">
          <div
            class="hour-slider__dot"
            [class.active]="selectedHours() >= 6"
          ></div>
          <div
            class="hour-slider__dot"
            [class.active]="selectedHours() >= 7"
          ></div>
          <div
            class="hour-slider__dot"
            [class.active]="selectedHours() >= 8"
          ></div>
          <div
            class="hour-slider__dot"
            [class.active]="selectedHours() >= 9"
          ></div>
          <div
            class="hour-slider__dot"
            [class.active]="selectedHours() >= 10"
          ></div>
          <div
            class="hour-slider__dot"
            [class.active]="selectedHours() >= 11"
          ></div>
        </div>
        <!-- Recommended Badge (Desktop) -->
        @if (selectedHours() === 6) {
        <div class="hour-slider__recommended-badge">
          <div class="hour-slider__badge-arrow"></div>
          <span class="hour-slider__badge-text">Recommended</span>
        </div>
        }
      </div>

      <!-- Recommendation -->
      <div class="hour-slider__recommendation">
        <svg
          class="hour-slider__star"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M9 1.5L11.3175 6.195L16.5 6.9525L12.75 10.605L13.635 15.75L9 13.3275L4.365 15.75L5.25 10.605L1.5 6.9525L6.6825 6.195L9 1.5Z"
            fill="#2169DB"
          />
        </svg>
        <p class="hour-slider__recommendation-text">
          Recommended for your best game day experience
        </p>
      </div>
    </div>
  `,
  styleUrl: './hour-slider.component.scss',
})
export class HourSliderComponent implements OnInit {
  selectedHours = signal(6);
  private isDragging = false;

  // Accept initial value from parent
  initialHours = input<number>(6);

  // Emit changes to parent
  hoursChange = output<number>();

  ngOnInit() {
    this.selectedHours.set(this.initialHours());
  }

  getSliderPosition(): string {
    const hours = this.selectedHours();
    // Range is 6-11 hours (5 hour range)
    // Calculate as percentage to work with responsive design
    const percentage = ((hours - 6) / 5) * 100;
    const trackPadding = 24; // 12px left + 12px right
    const handleOffset = 10; // Handle width compensation

    // Adjust position based on screen size
    const adjustedPercentage =
      (percentage * (100 - trackPadding)) / 100 + handleOffset;
    return `${Math.max(12, Math.min(88, adjustedPercentage))}%`;
  }

  getSliderProgress(): string {
    const hours = this.selectedHours();
    // Progress as percentage of track
    const progress = ((hours - 6) / 5) * 100;
    return `${Math.max(7, progress)}%`; // Minimum 7% to show some progress
  }

  onSliderClick(event: MouseEvent): void {
    if (this.isDragging) return;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left - 12; // Account for padding
    const trackWidth = rect.width - 24; // Account for padding
    const percentage = Math.max(0, Math.min(1, clickX / trackWidth));

    const hours = Math.round(6 + percentage * 5);
    const newHours = Math.max(6, Math.min(11, hours));
    this.selectedHours.set(newHours);
    this.hoursChange.emit(newHours);
  }

  onSliderMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    event.preventDefault();
    event.stopPropagation();

    const handle = event.currentTarget as HTMLElement;
    const slider = handle.parentElement as HTMLElement; // This is the track
    if (!slider) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!this.isDragging) return;

      const rect = slider.getBoundingClientRect();
      const moveX = e.clientX - rect.left - 12; // Account for padding
      const trackWidth = rect.width - 24; // Account for padding
      const percentage = Math.max(0, Math.min(1, moveX / trackWidth));

      const hours = Math.round(6 + percentage * 5);
      const newHours = Math.max(6, Math.min(11, hours));
      this.selectedHours.set(newHours);
      this.hoursChange.emit(newHours);
    };

    const handleMouseUp = () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
}
