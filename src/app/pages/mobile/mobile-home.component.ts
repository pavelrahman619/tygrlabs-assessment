import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-mobile-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mobile-home">
      <!-- Header -->
      <div class="mobile-home__header">
        <button class="mobile-home__back-btn">
          <span class="mobile-home__chevron">‹</span>
        </button>
        <h1 class="mobile-home__title">Set Total Ride Hour</h1>
      </div>

      <!-- Main Content -->
      <div class="mobile-home__content">
        <p class="mobile-home__question">
          How long would you like your ride to be?
        </p>

        <!-- Time Display -->
        <div class="mobile-home__time-display">
          <div class="mobile-home__hour-section">
            <span class="mobile-home__hour-number">{{ selectedHours() }}</span>
            <span class="mobile-home__hour-label"
              >hour{{ selectedHours() !== 1 ? 's' : '' }}</span
            >
          </div>
        </div>

        <!-- Timeline -->
        <div class="mobile-home__timeline">
          <div class="mobile-home__timeline-track">
            <div class="mobile-home__timeline-progress"></div>
            <div class="mobile-home__timeline-icon">🏟️</div>
          </div>
          <div class="mobile-home__timeline-info">
            <span class="mobile-home__game-info">Game starts at 8:00 PM</span>
          </div>
          <div class="mobile-home__time-range">
            <span class="mobile-home__start-time">6:00 PM</span>
            <span class="mobile-home__end-time">01:00 AM</span>
          </div>
        </div>

        <!-- Recommended Badge -->
        <div class="mobile-home__recommended">
          <span class="mobile-home__recommended-text">Recommended</span>
        </div>

        <!-- Slider -->
        <div class="mobile-home__slider-section">
          <div class="mobile-home__custom-slider">
            <div
              class="mobile-home__slider-track"
              (click)="onSliderClick($event)"
              #sliderTrack
            >
              <div class="mobile-home__star-start">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1.5L11.3175 6.195L16.5 6.9525L12.75 10.605L13.635 15.75L9 13.3275L4.365 15.75L5.25 10.605L1.5 6.9525L6.6825 6.195L9 1.5Z"
                    fill="#2169DB"
                  />
                </svg>
              </div>

              <div
                class="mobile-home__slider-dot"
                [class.active]="selectedHours() >= 1"
              ></div>
              <div
                class="mobile-home__slider-dot"
                [class.active]="selectedHours() >= 2"
              ></div>
              <div
                class="mobile-home__slider-dot"
                [class.active]="selectedHours() >= 3"
              ></div>
              <div
                class="mobile-home__slider-dot"
                [class.active]="selectedHours() >= 4"
              ></div>

              <div
                class="mobile-home__slider-handle"
                [style.left.%]="getSliderPosition()"
                (mousedown)="onSliderMouseDown($event)"
                (touchstart)="onSliderTouchStart($event)"
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="24" cy="24" r="24" fill="#2169DB" />
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    stroke="white"
                    stroke-opacity="0.1"
                    stroke-width="10"
                  />
                </svg>
              </div>

              <div
                class="mobile-home__slider-dot"
                [class.active]="selectedHours() >= 6"
              ></div>
            </div>
          </div>
          <p class="mobile-home__slider-text">
            Slide to set total ride duration
          </p>
        </div>

        <!-- Recommendation Note -->
        <div class="mobile-home__recommendation">
          <span class="mobile-home__star">⭐</span>
          <p class="mobile-home__recommendation-text">
            Recommended for your best game day experience
          </p>
        </div>
      </div>

      <!-- Continue Button -->
      <button class="mobile-home__continue-btn">Continue</button>
    </div>
  `,
  styles: `
    .mobile-home {
      position: relative;
      width: 393px;
      height: 852px;
      margin: 0 auto;
      background: linear-gradient(180deg, #f3f3f3 0%, #f0f6ff 100%);
      overflow: hidden;
      font-family: 'Arial', sans-serif;

      &__status-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 60px;
        padding: 0 16px;
        background-color: #ffffff;
        position: absolute;
        top: 0;
        left: 0;
      }

      &__status-left {
        display: flex;
        align-items: center;
      }

      &__time {
        font-size: 16px;
        font-weight: 600;
        color: #000000;
        letter-spacing: -0.32px;
      }

      &__dynamic-island {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 125px;
        height: 37px;
        background-color: #000000;
        border-radius: 100px;
      }

      &__status-right {
        display: flex;
        align-items: center;
      }

      &__signal-icons {
        display: flex;
        gap: 8px;

        span {
          font-size: 12px;
        }
      }

      &__header {
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        height: 56px;
        background-color: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        padding: 0 16px;
      }

      &__back-btn {
        background: none;
        border: none;
        padding: 0;
        margin-right: 16px;
        cursor: pointer;
      }

      &__chevron {
        font-size: 24px;
        color: #000000;
      }

      &__title {
        font-size: 20px;
        font-weight: 700;
        color: #212121;
        text-align: center;
        flex: 1;
        margin: 0;
        letter-spacing: -0.1px;
      }

      &__content {
        position: absolute;
        top: 139px;
        left: 16px;
        right: 16px;
        bottom: 180px;
      }

      &__question {
        font-size: 16px;
        font-weight: 500;
        color: #141414;
        text-align: center;
        margin: 0 0 40px 0;
        line-height: 22px;
      }

      &__time-display {
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
      }

      &__hour-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      &__hour-number {
        font-size: 96px;
        font-weight: 500;
        color: #212121;
        line-height: 56px;
        letter-spacing: -0.1px;
      }

      &__hour-label {
        font-size: 36px;
        font-weight: 500;
        color: #212121;
        line-height: 40px;
        letter-spacing: -0.1px;
        margin-top: 14px;
      }

      &__timeline {
        position: relative;
        margin: 40px 0;
      }

      &__timeline-track {
        position: relative;
        height: 44px;
        background: linear-gradient(90deg, #79e9af 0%, rgba(255, 255, 255, 0) 100%);
        border-radius: 22px;
        display: flex;
        align-items: center;
        padding: 0 12px;
      }

      &__timeline-icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        background-color: #d3e1f8;
        border-radius: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }

      &__timeline-info {
        position: absolute;
        top: 6px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #ffffff;
        padding: 4px 8px;
        border-radius: 16px;
        font-size: 12px;
        font-weight: 500;
        color: #141414;
        white-space: nowrap;
      }

      &__time-range {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        padding: 0 12px;
      }

      &__start-time,
      &__end-time {
        font-size: 20px;
        font-weight: 500;
        color: #141414;
        letter-spacing: -0.1px;
      }

      &__recommended {
        position: relative;
        margin: 20px 0;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 9px solid #2169db;
        }
      }

      &__recommended-text {
        background-color: #2169db;
        color: #ffffff;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
        display: inline-block;
      }

      &__slider-section {
        margin: 40px 0;
      }

      &__custom-slider {
        background-color: rgba(33, 105, 219, 0.1);
        border-radius: 50px;
        padding: 10px 12px;
        margin-bottom: 8px;
      }

      &__slider-track {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        width: 100%;
        height: 48px;
      }

      &__star-start {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }

      &__slider-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #2169DB;
        flex-shrink: 0;

        &.active {
          background-color: #2169DB;
        }
      }

      &__slider-handle {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        cursor: grab;
        transition: transform 0.2s ease;
        z-index: 10;

        &:hover {
          transform: scale(1.05);
        }

        &:active {
          cursor: grabbing;
        }
      }

      &__slider-text {
        font-size: 16px;
        font-weight: 500;
        color: #232323;
        text-align: center;
        margin: 0;
        line-height: 22px;
      }

      &__recommendation {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        margin-top: 40px;
      }

      &__star {
        font-size: 18px;
      }

      &__recommendation-text {
        font-size: 12px;
        font-weight: 500;
        color: #212121;
        opacity: 0.54;
        text-align: center;
        letter-spacing: 0.2px;
        line-height: 16px;
        margin: 0;
        max-width: 283px;
      }

      &__continue-btn {
        position: absolute;
        bottom: 80px;
        left: 8px;
        right: 8px;
        background-color: #2169db;
        color: #ffffff;
        border: none;
        border-radius: 12px;
        padding: 16px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        line-height: 20px;
      }

      &__tab-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 54px;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border-top: 0.5px solid rgba(60, 60, 67, 0.36);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 0 0;
      }

      &__url-bar {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: #000000;
        margin-bottom: 8px;
      }

      &__lock {
        font-size: 10px;
      }

      &__home-indicator {
        width: 134px;
        height: 5px;
        background-color: #000000;
        border-radius: 100px;
        margin-top: auto;
        margin-bottom: 8px;
      }
    }
  `,
})
export class MobileHomeComponent {
  selectedHours = signal(6);
  private isDragging = false;

  getSliderPosition(): number {
    const hours = this.selectedHours();
    // Position the handle accounting for its width (48px)
    // The track starts at star (18px) and handle is 48px wide
    const trackWidth = 100; // percentage
    const handleOffset = 24; // Half of handle width in pixels
    return ((hours - 1) / 5) * (trackWidth - 12); // 12% accounts for handle width
  }

  onSliderClick(event: MouseEvent): void {
    if (this.isDragging) return; // Prevent click during drag

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));

    const hours = Math.round(1 + percentage * 5);
    this.selectedHours.set(Math.max(1, Math.min(6, hours)));
  }

  onSliderMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    event.preventDefault();
    event.stopPropagation(); // Prevent click event on track

    const slider = document.querySelector(
      '.mobile-home__slider-track'
    ) as HTMLElement;
    if (!slider) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!this.isDragging) return;

      const rect = slider.getBoundingClientRect();
      const moveX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, moveX / rect.width));

      const hours = Math.round(1 + percentage * 5);
      this.selectedHours.set(Math.max(1, Math.min(6, hours)));
    };

    const handleMouseUp = () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  onSliderTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    event.preventDefault();
    event.stopPropagation();

    const slider = document.querySelector(
      '.mobile-home__slider-track'
    ) as HTMLElement;
    if (!slider) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (!this.isDragging || e.touches.length === 0) return;

      const rect = slider.getBoundingClientRect();
      const moveX = e.touches[0].clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, moveX / rect.width));

      const hours = Math.round(1 + percentage * 5);
      this.selectedHours.set(Math.max(1, Math.min(6, hours)));
    };

    const handleTouchEnd = () => {
      this.isDragging = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }
}
