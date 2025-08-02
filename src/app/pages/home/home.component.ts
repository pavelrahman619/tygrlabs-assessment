import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="desktop-home">
      <!-- Progress Header -->
      <div class="desktop-home__header">
        <div class="desktop-home__step-slider">
          <div class="desktop-home__progress-track"></div>
          <div
            class="desktop-home__progress-bar"
            [style.width]="getProgressWidth()"
          ></div>
          <div class="desktop-home__progress-dots">
            <div class="desktop-home__dot" [class.active]="true"></div>
            <div class="desktop-home__dot"></div>
            <div class="desktop-home__dot"></div>
          </div>
          <div class="desktop-home__step-counter">1</div>
        </div>
        <div class="desktop-home__header-content">
          <svg
            class="desktop-home__chevron"
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
          <h1 class="desktop-home__title">Select Your Game</h1>
        </div>
      </div>

      <!-- Time Display Section -->
      <div class="desktop-home__time-section">
        <div class="desktop-home__time-display">
          <div class="desktop-home__time-info">
            <div class="desktop-home__start-time">{{ getRideStartTime() }}</div>
            <div class="desktop-home__game-info">
              <span class="desktop-home__game-label">Game starts at </span>
              <span class="desktop-home__game-time">{{
                getGameStartTime()
              }}</span>
            </div>
            <div class="desktop-home__end-time">{{ getRideEndTime() }}</div>
          </div>

          <!-- Timeline -->
          <div class="desktop-home__timeline">
            <div class="desktop-home__timeline-start">
              <div class="desktop-home__timeline-gradient"></div>
              <svg
                class="desktop-home__pickup-arrow"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <circle cx="16" cy="16" r="16" fill="#79E9AF" />
                <path d="M12 16L16 12L20 16" stroke="white" stroke-width="2" />
              </svg>
            </div>
            <div class="desktop-home__timeline-middle">
              <svg
                class="desktop-home__middle-arrow"
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
              <div class="desktop-home__middle-line"></div>
              <div class="desktop-home__stadium-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#D3E1F8" />
                  <path d="M8 12H24V20H8V12Z" fill="#2169DB" />
                  <path d="M10 14H22V18H10V14Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="desktop-home__main-content">
        <div class="desktop-home__question-section">
          <p class="desktop-home__question">
            How long would you like your ride to be?
          </p>

          <!-- Hour Display -->
          <div class="desktop-home__hour-display">
            <span class="desktop-home__hour-number">{{ selectedHours() }}</span>
            <span class="desktop-home__hour-label"
              >hour{{ selectedHours() === 1 ? '' : 's' }}</span
            >
          </div>

          <!-- Slider -->
          <div class="desktop-home__slider-section">
            <p class="desktop-home__slider-text">
              Slide to set total ride duration
            </p>
            <div class="desktop-home__slider-container">
              <div
                class="desktop-home__slider-track"
                (click)="onSliderClick($event)"
                #sliderTrack
              >
                <div
                  class="desktop-home__slider-progress"
                  [style.width]="getSliderProgress()"
                ></div>
                <div
                  class="desktop-home__slider-handle"
                  [style.left]="getSliderPosition()"
                  (mousedown)="onSliderMouseDown($event)"
                ></div>
              </div>
              <div class="desktop-home__slider-dots">
                <div
                  class="desktop-home__slider-dot"
                  [class.active]="selectedHours() >= 6"
                ></div>
                <div
                  class="desktop-home__slider-dot"
                  [class.active]="selectedHours() >= 7"
                ></div>
                <div
                  class="desktop-home__slider-dot"
                  [class.active]="selectedHours() >= 8"
                ></div>
                <div
                  class="desktop-home__slider-dot"
                  [class.active]="selectedHours() >= 9"
                ></div>
                <div
                  class="desktop-home__slider-dot"
                  [class.active]="selectedHours() >= 10"
                ></div>
                <div
                  class="desktop-home__slider-dot"
                  [class.active]="selectedHours() >= 11"
                ></div>
              </div>

              <!-- Recommended Badge -->
              @if (selectedHours() === 6) {
              <div class="desktop-home__recommended-badge">
                <div class="desktop-home__badge-arrow"></div>
                <div class="desktop-home__badge-text">Recommended</div>
              </div>
              }

              <!-- Recommendation right below slider dots -->
              <div class="desktop-home__recommendation">
                <svg
                  class="desktop-home__star"
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
                <p class="desktop-home__recommendation-text">
                  Recommended for your best game day experience
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Continue Button -->
        <button class="desktop-home__continue-btn">Continue</button>
      </div>
    </div>
  `,
  styles: `
    .desktop-home {
      position: relative;
      width: 100vw;
      min-height: 100vh;
      background: linear-gradient(180deg, #f0f6ff 0%, #f3f3f3 100%);
      font-family: 'Arial', sans-serif;
      overflow-x: hidden;

      // Desktop layout (768px and up)
      @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
      }

      // Mobile layout (767px and below)
      @media (max-width: 767px) {
        padding: 1rem;
      }

      &__header {
        width: 100%;
        max-width: 640px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 24px;
        padding: 12px 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto 2rem;

        // Desktop positioning
        @media (min-width: 768px) {
          margin-top: 4rem;
        }

        // Mobile adjustments
        @media (max-width: 767px) {
          margin-top: 1rem;
          padding: 8px 16px;
        }
      }

      &__step-slider {
        position: relative;
        width: 100%;
        max-width: 592px;
        height: 24px;
        margin-bottom: 12px;
      }

      &__progress-track {
        position: absolute;
        width: 100%;
        height: 6px;
        top: 9px;
        left: 0;
        background-color: rgba(33, 105, 219, 0.1);
        border-radius: 44px;
      }

      &__progress-bar {
        position: absolute;
        height: 6px;
        top: 9px;
        left: 0;
        background-color: #2169db;
        border-radius: 44px;
        transition: width 0.3s ease;
      }

      &__progress-dots {
        position: absolute;
        top: 9px;
        left: 20%;
        display: flex;
        gap: 45%;
        align-items: center;
        width: 60%;

        @media (max-width: 767px) {
          left: 15%;
          gap: 15%;
          width: 70%;
        }
      }

      &__dot {
        width: 6px;
        height: 6px;
        background-color: #2169db;
        border-radius: 3px;

        &.active {
          background-color: #2169db;
        }
      }

      &__step-counter {
        position: absolute;
        top: 0;
        left: 18%;
        width: 24px;
        height: 24px;
        background-color: #2169db;
        border-radius: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 500;
        color: #f3f3f3;
        letter-spacing: 0.2px;
        line-height: 16px;

        @media (max-width: 767px) {
          left: 13%;
        }
      }

      &__header-content {
        display: flex;
        align-items: center;
        gap: 16px;

        @media (max-width: 767px) {
          gap: 8px;
        }
      }

      &__chevron {
        width: 26px;
        height: 25px;

        @media (max-width: 767px) {
          width: 20px;
          height: 20px;
        }
      }

      &__title {
        font-size: 36px;
        font-weight: 500;
        color: #212121;
        letter-spacing: -0.1px;
        line-height: 40px;
        margin: 0;

        @media (max-width: 767px) {
          font-size: 24px;
          line-height: 28px;
        }
      }

      &__time-section {
        width: 100%;
        max-width: 640px;
        background-color: rgba(255, 255, 255, 0.5);
        border: 3px solid rgba(255, 255, 255, 0.8);
        border-radius: 24px 24px 0 0;
        padding: 16px 24px;
        margin: 0 auto 1rem;

        @media (max-width: 767px) {
          padding: 12px 16px;
          border-radius: 16px 16px 0 0;
        }
      }

      &__time-display {
        width: 100%;
        max-width: 592px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
      }

      &__time-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        @media (max-width: 767px) {
          flex-direction: column;
          gap: 12px;
          text-align: center;
        }
      }

      &__start-time,
      &__end-time {
        font-size: 24px;
        font-weight: 500;
        color: #141414;
        letter-spacing: -0.2px;
        line-height: 32px;

        @media (max-width: 767px) {
          font-size: 20px;
          line-height: 28px;
        }
      }

      &__game-info {
        background-color: #ffffff;
        padding: 8px;
        border-radius: 16px;
        text-align: center;

        @media (max-width: 767px) {
          padding: 6px;
          border-radius: 12px;
        }
      }

      &__game-label {
        font-size: 16px;
        font-weight: 500;
        color: rgba(20, 20, 20, 0.3);
        line-height: 22px;

        @media (max-width: 767px) {
          font-size: 14px;
          line-height: 20px;
        }
      }

      &__game-time {
        font-size: 16px;
        font-weight: 500;
        color: #141414;
        line-height: 22px;

        @media (max-width: 767px) {
          font-size: 14px;
          line-height: 20px;
        }
      }

      &__timeline {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 44px;

        @media (max-width: 767px) {
          height: 36px;
          flex-direction: column;
          gap: 8px;
        }
      }

      &__timeline-start {
        display: flex;
        align-items: center;
        width: 225px;
        height: 44px;
        background-color: #ffffff;
        border-radius: 0 50px 50px 0;
        padding: 0 12px;

        @media (max-width: 767px) {
          width: 100%;
          height: 36px;
          border-radius: 18px;
        }
      }

      &__timeline-gradient {
        flex: 1;
        height: 16px;
        border-radius: 50px;
        background: linear-gradient(90deg, #79e9af 0%, rgba(255, 255, 255, 0) 100%);

        @media (max-width: 767px) {
          height: 12px;
        }
      }

      &__pickup-arrow {
        margin-left: -12px;

        @media (max-width: 767px) {
          width: 24px;
          height: 24px;
          margin-left: -8px;
        }
      }

      &__timeline-middle {
        display: flex;
        align-items: center;
        flex: 1;
        position: relative;

        @media (max-width: 767px) {
          width: 100%;
          justify-content: center;
        }
      }

      &__middle-arrow {
        position: absolute;
        left: 20px;

        @media (max-width: 767px) {
          position: static;
          width: 24px;
          height: 24px;
        }
      }

      &__middle-line {
        flex: 1;
        height: 44px;
        margin: 0 -42px 0 -40px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 271 44'%3E%3Cpath fill='%23D3E1F8' d='M0 0h271v44H0z'/%3E%3C/svg%3E");

        @media (max-width: 767px) {
          display: none;
        }
      }

      &__stadium-icon {
        position: absolute;
        right: 0;
        width: 60px;
        height: 60px;
        background-color: #d3e1f8;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        @media (max-width: 767px) {
          position: static;
          width: 48px;
          height: 48px;
          margin-left: 12px;
        }
      }

      &__main-content {
        width: 100%;
        max-width: 640px;
        background-color: #ffffff;
        border-radius: 24px;
        padding: 24px;
        backdrop-filter: blur(10px);
        margin: 0 auto;

        @media (max-width: 767px) {
          padding: 16px;
          border-radius: 16px;
        }
      }

      &__question-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 16px;

        @media (max-width: 767px) {
          padding-top: 8px;
        }
      }

      &__question {
        font-size: 18px;
        font-weight: 500;
        color: #141414;
        text-align: center;
        letter-spacing: -0.1px;
        line-height: 24px;
        margin: 0 0 40px 0;

        @media (max-width: 767px) {
          font-size: 16px;
          line-height: 22px;
          margin: 0 0 24px 0;
        }
      }

      &__hour-display {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;

        @media (max-width: 767px) {
          margin-bottom: 24px;
        }
      }

      &__hour-number {
        font-size: 96px;
        font-weight: 500;
        color: #141414;
        text-align: center;
        letter-spacing: -0.1px;
        line-height: 56px;

        @media (max-width: 767px) {
          font-size: 64px;
          line-height: 40px;
        }
      }

      &__hour-label {
        font-size: 36px;
        font-weight: 500;
        color: #141414;
        text-align: center;
        letter-spacing: -0.1px;
        line-height: 40px;
        margin-top: 14px;

        @media (max-width: 767px) {
          font-size: 24px;
          line-height: 28px;
          margin-top: 8px;
        }
      }

      &__slider-section {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
      }

      &__slider-text {
        font-size: 16px;
        font-weight: 500;
        color: rgba(20, 20, 20, 0.7);
        text-align: center;
        letter-spacing: 0;
        line-height: 22px;
        margin: 0 0 16px 0;

        @media (max-width: 767px) {
          font-size: 14px;
          line-height: 20px;
          margin: 0 0 12px 0;
        }
      }

      &__slider-container {
        position: relative;
      }

      &__slider-track {
        width: 100%;
        max-width: 592px;
        height: 39px;
        background-color: rgba(33, 105, 219, 0.1);
        border-radius: 50px;
        padding: 10px 12px;
        position: relative;
        cursor: pointer;
        margin: 0 auto;

        @media (max-width: 767px) {
          height: 35px;
          padding: 8px 10px;
        }
      }

      &__slider-progress {
        height: 8px;
        background: linear-gradient(90deg, #2169db 0%, #2169db 100%);
        border-radius: 50px;
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
        transition: width 0.3s ease;

        @media (max-width: 767px) {
          height: 6px;
          left: 10px;
        }
      }

      &__slider-handle {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        background-color: #2169db;
        border-radius: 50%;
        cursor: grab;
        transition: left 0.3s ease;
        z-index: 10;

        &:hover {
          transform: translateY(-50%) scale(1.1);
        }

        &:active {
          cursor: grabbing;
        }

        @media (max-width: 767px) {
          width: 16px;
          height: 16px;
        }
      }

      &__slider-dots {
        display: flex;
        justify-content: space-between;
        padding: 0 24px;
        margin-top: 10px;
        width: 100%;
        max-width: 515px;
        margin-left: auto;
        margin-right: auto;

        @media (max-width: 767px) {
          padding: 0 20px;
          margin-top: 8px;
          max-width: 400px;
        }
      }

      &__slider-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: rgba(33, 105, 219, 0.3);
        transition: background-color 0.3s ease;

        &.active {
          background-color: #2169db;
        }

        @media (max-width: 767px) {
          width: 4px;
          height: 4px;
        }
      }

      &__recommendation {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        margin: 16px 0 20px;

        @media (max-width: 767px) {
          margin: 12px 0 16px;
          gap: 6px;
        }
      }

      &__star {
        width: 18px;
        height: 18px;

        @media (max-width: 767px) {
          width: 16px;
          height: 16px;
        }
      }

      &__recommendation-text {
        font-size: 12px;
        font-weight: 500;
        color: rgba(33, 33, 33, 0.54);
        text-align: center;
        letter-spacing: 0.2px;
        line-height: 16px;
        margin: 0;
        max-width: 283px;

        @media (max-width: 767px) {
          font-size: 11px;
          line-height: 14px;
          max-width: 240px;
        }
      }

      &__continue-btn {
        width: 100%;
        height: 72px;
        background-color: #2169db;
        border: 1px solid #7aa5e9;
        border-radius: 12px;
        color: #ffffff;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -0.1px;
        line-height: 26px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #1a5bb8;
        }

        @media (max-width: 767px) {
          height: 56px;
          font-size: 16px;
          line-height: 22px;
          border-radius: 8px;
        }
      }

      &__recommended-badge {
        position: absolute;
        width: 118px;
        height: 30px;
        bottom: 2rem;
        left: 6%;
        transform: translateX(-50%);

        @media (max-width: 767px) {
          bottom: 1rem;
          width: 100px;
          height: 26px;
        }
      }

      &__badge-arrow {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6.5px solid transparent;
        border-right: 6.5px solid transparent;
        border-bottom: 9px solid #2169db;

        @media (max-width: 767px) {
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 7px solid #2169db;
        }
      }

      &__badge-text {
        position: absolute;
        top: 5px;
        left: 0;
        width: 100%;
        height: 24px;
        background-color: #2169db;
        color: #ffffff;
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        line-height: 24px;
        border-radius: 12px;

        @media (max-width: 767px) {
          height: 20px;
          font-size: 10px;
          line-height: 20px;
          border-radius: 10px;
          top: 4px;
        }
      }
    }
  `,
})
export class HomeComponent {
  selectedHours = signal(6);
  private isDragging = false;

  getProgressWidth(): string {
    return '20%'; // Static progress for step 1
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

  getGameStartTime(): string {
    return '8:00 PM';
  }

  getRideStartTime(): string {
    const hours = this.selectedHours();
    // Start time is based on selected hours: 6 hours = 6:00 PM, etc.
    const startHour = 12 + hours; // 12 + 6 = 18 (6:00 PM)

    if (startHour === 12) {
      return '12:00 PM';
    } else if (startHour > 12 && startHour < 24) {
      return `${startHour - 12}:00 PM`;
    } else if (startHour >= 24) {
      const adjustedHour = startHour - 24;
      if (adjustedHour === 0) {
        return '12:00 AM';
      } else if (adjustedHour < 12) {
        return `${adjustedHour}:00 AM`;
      } else {
        return `${adjustedHour - 12}:00 PM`;
      }
    } else {
      if (startHour === 0) {
        return '12:00 AM';
      }
      return `${startHour}:00 AM`;
    }
  }

  getRideEndTime(): string {
    const hours = this.selectedHours();
    const gameStartHour = 20; // 8 PM
    const rideStartHour = gameStartHour - hours;
    const rideEndHour = rideStartHour + hours;
    const additionalTime = hours / 2;
    const totalExperienceEndHour = rideEndHour + Math.floor(additionalTime);
    const minutes = Math.round((additionalTime % 1) * 60);

    let finalEndHour = totalExperienceEndHour;

    if (finalEndHour >= 24) {
      finalEndHour = finalEndHour - 24;
    }

    const minutesStr =
      minutes === 0 ? '00' : minutes.toString().padStart(2, '0');

    if (finalEndHour === 0) {
      return `12:${minutesStr} AM`;
    } else if (finalEndHour <= 12) {
      if (finalEndHour === 12) {
        return `12:${minutesStr} PM`;
      }
      return `${finalEndHour}:${minutesStr} AM`;
    } else {
      return `${finalEndHour - 12}:${minutesStr} PM`;
    }
  }

  onSliderClick(event: MouseEvent): void {
    if (this.isDragging) return;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left - 12; // Account for padding
    const trackWidth = rect.width - 24; // Account for padding
    const percentage = Math.max(0, Math.min(1, clickX / trackWidth));

    const hours = Math.round(6 + percentage * 5);
    this.selectedHours.set(Math.max(6, Math.min(11, hours)));
  }

  onSliderMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    event.preventDefault();
    event.stopPropagation();

    const slider = document.querySelector(
      '.desktop-home__slider-track'
    ) as HTMLElement;
    if (!slider) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!this.isDragging) return;

      const rect = slider.getBoundingClientRect();
      const moveX = e.clientX - rect.left - 12;
      const trackWidth = rect.width - 24;
      const percentage = Math.max(0, Math.min(1, moveX / trackWidth));

      const hours = Math.round(6 + percentage * 5);
      this.selectedHours.set(Math.max(6, Math.min(11, hours)));
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
