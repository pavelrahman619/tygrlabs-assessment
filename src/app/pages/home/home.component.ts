import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
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
